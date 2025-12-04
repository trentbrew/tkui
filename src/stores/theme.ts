import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ThemeEditorState, ThemeStyles } from "../types/theme";
import { defaultThemeState, themePresets } from "../config/theme";

const MAX_HISTORY_COUNT = 30;
const HISTORY_OVERRIDE_THRESHOLD_MS = 500; // 0.5 seconds

interface ThemeHistoryEntry {
  state: ThemeEditorState;
  timestamp: number;
}

export const useThemeStore = defineStore(
  "theme",
  () => {
    // State
    const themeState = ref<ThemeEditorState>({ ...defaultThemeState });
    const themeCheckpoint = ref<ThemeEditorState | null>(null);
    const history = ref<ThemeHistoryEntry[]>([]);
    const future = ref<ThemeHistoryEntry[]>([]);

    // Getters
    const currentMode = computed(() => themeState.value.currentMode);
    const currentStyles = computed(() => themeState.value.styles);
    const currentPreset = computed(() => themeState.value.preset);

    // Check if deep equal (simple implementation)
    function isDeepEqual(obj1: any, obj2: any): boolean {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    // Get preset theme styles
    function getPresetThemeStyles(preset?: string): ThemeStyles {
      if (!preset || preset === "default") {
        return defaultThemeState.styles;
      }

      const presetData = themePresets[preset];
      if (!presetData) {
        return defaultThemeState.styles;
      }

      // Merge preset with defaults
      return {
        light: { ...defaultThemeState.styles.light, ...presetData.styles.light },
        dark: { ...defaultThemeState.styles.dark, ...presetData.styles.dark },
      };
    }

    // Actions
    function setThemeState(newState: ThemeEditorState) {
      const oldThemeState = themeState.value;
      let currentHistory = history.value;
      let currentFuture = future.value;

      // Check if only currentMode changed
      const oldStateWithoutMode = { ...oldThemeState, currentMode: undefined };
      const newStateWithoutMode = { ...newState, currentMode: undefined };

      if (
        isDeepEqual(oldStateWithoutMode, newStateWithoutMode) &&
        oldThemeState.currentMode !== newState.currentMode
      ) {
        // Only currentMode changed
        themeState.value = newState;
        return;
      }

      const currentTime = Date.now();

      // Proceed with history logic
      const lastHistoryEntry =
        currentHistory.length > 0 ? currentHistory[currentHistory.length - 1] : null;

      if (
        !lastHistoryEntry ||
        currentTime - lastHistoryEntry.timestamp >= HISTORY_OVERRIDE_THRESHOLD_MS
      ) {
        // Add a new history entry
        currentHistory = [...currentHistory, { state: oldThemeState, timestamp: currentTime }];
        currentFuture = [];
      }

      if (currentHistory.length > MAX_HISTORY_COUNT) {
        currentHistory.shift();
      }

      themeState.value = newState;
      history.value = currentHistory;
      future.value = currentFuture;
    }

    function applyThemePreset(preset: string) {
      const currentThemeState = themeState.value;
      const oldHistory = history.value;
      const currentTime = Date.now();

      const newStyles = getPresetThemeStyles(preset);
      const newThemeState: ThemeEditorState = {
        ...currentThemeState,
        preset,
        styles: newStyles,
        hslAdjustments: defaultThemeState.hslAdjustments,
      };

      const newHistoryEntry = { state: currentThemeState, timestamp: currentTime };
      let updatedHistory = [...oldHistory, newHistoryEntry];
      if (updatedHistory.length > MAX_HISTORY_COUNT) {
        updatedHistory.shift();
      }

      themeState.value = newThemeState;
      themeCheckpoint.value = newThemeState;
      history.value = updatedHistory;
      future.value = [];
    }

    function saveThemeCheckpoint() {
      themeCheckpoint.value = { ...themeState.value };
    }

    function restoreThemeCheckpoint() {
      const checkpoint = themeCheckpoint.value;
      if (checkpoint) {
        const oldThemeState = themeState.value;
        const oldHistory = history.value;
        const currentTime = Date.now();

        const newHistoryEntry = { state: oldThemeState, timestamp: currentTime };
        let updatedHistory = [...oldHistory, newHistoryEntry];
        if (updatedHistory.length > MAX_HISTORY_COUNT) {
          updatedHistory.shift();
        }

        themeState.value = {
          ...checkpoint,
          currentMode: themeState.value.currentMode,
        };
        history.value = updatedHistory;
        future.value = [];
      } else {
        console.warn("No theme checkpoint available to restore to.");
      }
    }

    function hasThemeChangedFromCheckpoint(): boolean {
      const checkpoint = themeCheckpoint.value;
      return !isDeepEqual(themeState.value, checkpoint);
    }

    function hasUnsavedChanges(): boolean {
      const presetThemeStyles = getPresetThemeStyles(themeState.value.preset ?? "default");
      const stylesChanged = !isDeepEqual(themeState.value.styles, presetThemeStyles);
      const hslChanged = !isDeepEqual(
        themeState.value.hslAdjustments,
        defaultThemeState.hslAdjustments
      );
      return stylesChanged || hslChanged;
    }

    function resetToCurrentPreset() {
      const currentThemeState = themeState.value;

      const presetThemeStyles = getPresetThemeStyles(currentThemeState.preset ?? "default");
      const newThemeState: ThemeEditorState = {
        ...currentThemeState,
        styles: presetThemeStyles,
        hslAdjustments: defaultThemeState.hslAdjustments,
      };

      themeState.value = newThemeState;
      themeCheckpoint.value = newThemeState;
      history.value = [];
      future.value = [];
    }

    function undo() {
      const historyEntries = history.value;
      if (historyEntries.length === 0) {
        return;
      }

      const currentThemeState = themeState.value;
      const futureEntries = future.value;

      const lastHistoryEntry = historyEntries[historyEntries.length - 1];
      const newHistory = historyEntries.slice(0, -1);

      const newFutureEntry = { state: currentThemeState, timestamp: Date.now() };
      const newFuture = [newFutureEntry, ...futureEntries];

      themeState.value = {
        ...lastHistoryEntry.state,
        currentMode: currentThemeState.currentMode,
      };
      themeCheckpoint.value = lastHistoryEntry.state;
      history.value = newHistory;
      future.value = newFuture;
    }

    function redo() {
      const futureEntries = future.value;
      if (futureEntries.length === 0) {
        return;
      }
      const historyEntries = history.value;

      const firstFutureEntry = futureEntries[0];
      const newFuture = futureEntries.slice(1);

      const currentThemeState = themeState.value;

      const newHistoryEntry = { state: currentThemeState, timestamp: Date.now() };
      let updatedHistory = [...historyEntries, newHistoryEntry];
      if (updatedHistory.length > MAX_HISTORY_COUNT) {
        updatedHistory.shift();
      }

      themeState.value = {
        ...firstFutureEntry.state,
        currentMode: currentThemeState.currentMode,
      };
      themeCheckpoint.value = firstFutureEntry.state;
      history.value = updatedHistory;
      future.value = newFuture;
    }

    const canUndo = computed(() => history.value.length > 0);
    const canRedo = computed(() => future.value.length > 0);

    function toggleMode() {
      const newMode = themeState.value.currentMode === "light" ? "dark" : "light";
      themeState.value = { ...themeState.value, currentMode: newMode };
    }

    return {
      // State
      themeState,
      themeCheckpoint,
      history,
      future,

      // Getters
      currentMode,
      currentStyles,
      currentPreset,
      canUndo,
      canRedo,

      // Actions
      setThemeState,
      applyThemePreset,
      saveThemeCheckpoint,
      restoreThemeCheckpoint,
      hasThemeChangedFromCheckpoint,
      hasUnsavedChanges,
      resetToCurrentPreset,
      undo,
      redo,
      toggleMode,
      getPresetThemeStyles,
    };
  }
);
