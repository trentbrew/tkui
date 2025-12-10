import { computed, watch } from "vue";
import type { Theme, ThemeStyles } from "../types/theme";

import { useThemeStore } from "../stores/theme";
import { useThemeManagerStore } from "../stores/themeManager";
import { applyThemeToElement } from "../utils/theme";

/**
 * Composable for managing standalone themes
 * Provides a clean interface for theme operations with automatic DOM updates
 */
export function useThemes() {
  const themeManager = useThemeManagerStore();
  const themeEditor = useThemeStore();

  // Initialize on first use
  if (!themeManager.initialized) {
    themeManager.initialize();
  }

  // ============================================
  // Computed Properties
  // ============================================

  /** All available themes (presets + custom) */
  const allThemes = computed(() => themeManager.allThemes);

  /** Preset themes only */
  const presetThemes = computed(() => themeManager.presetThemes);

  /** Custom themes only */
  const customThemes = computed(() => themeManager.customThemesList);

  /** Currently active theme */
  const activeTheme = computed(() => themeManager.activeTheme);

  /** Pinned/favorite themes */
  const pinnedThemes = computed(() => themeManager.pinnedThemes);

  /** Current color mode */
  const currentMode = computed(() => themeManager.currentMode);

  /** Current theme styles for the active mode */
  const currentStyles = computed(() => themeManager.currentThemeStyles);

  /** Themes grouped by source (presets vs custom) */
  const themesBySource = computed(() => themeManager.themesBySource);

  // ============================================
  // Theme Application
  // ============================================

  /**
   * Apply a theme to the document
   */
  function applyTheme(themeId: string | null) {
    if (!themeId) {
      // Reset to default
      themeEditor.applyThemePreset("toolkit");
      themeManager.setActiveTheme(null);
      return;
    }

    const theme = themeManager.getThemeById(themeId);
    if (!theme) {
      console.warn(`Theme ${themeId} not found`);
      return;
    }

    // Apply theme to DOM
    applyThemeToElement(
      {
        preset: theme.presetKey || theme.id,
        styles: theme.styles,
        currentMode: themeManager.currentMode,
      },
      document.documentElement
    );

    // Update stores
    themeManager.setActiveTheme(themeId);

    // Sync with theme editor store
    themeEditor.setThemeState({
      preset: theme.presetKey || theme.id,
      styles: theme.styles,
      currentMode: themeManager.currentMode,
    });
  }

  /**
   * Apply a preset theme by its key
   */
  function applyPreset(presetKey: string) {
    const theme = themeManager.getThemeByPresetKey(presetKey);
    if (theme) {
      applyTheme(theme.id);
    } else {
      console.warn(`Preset ${presetKey} not found`);
    }
  }

  // ============================================
  // Theme CRUD Operations
  // ============================================

  /**
   * Create a new custom theme
   */
  function createTheme(options: {
    name: string;
    description?: string;
    styles?: ThemeStyles;
    basePresetKey?: string;
    author?: string;
    tags?: string[];
  }): Theme {
    return themeManager.createTheme(options);
  }

  /**
   * Update an existing custom theme
   */
  function updateTheme(id: string, updates: Partial<Omit<Theme, "id" | "createdAt" | "source">>) {
    themeManager.updateTheme(id, updates);

    // If this is the active theme, reapply it
    if (themeManager.activeThemeId === id) {
      applyTheme(id);
    }
  }

  /**
   * Delete a custom theme
   */
  function deleteTheme(id: string) {
    themeManager.deleteTheme(id);
  }

  /**
   * Duplicate a theme
   */
  function duplicateTheme(id: string): Theme | null {
    return themeManager.duplicateTheme(id);
  }

  // ============================================
  // Favorites/Pinning
  // ============================================

  /**
   * Toggle pin status for a theme
   */
  function togglePinned(id: string) {
    themeManager.togglePinned(id);
  }

  /**
   * Check if a theme is pinned
   */
  function isPinned(id: string): boolean {
    return themeManager.pinnedThemeIds.includes(id);
  }

  // ============================================
  // Color Mode
  // ============================================

  /**
   * Set the color mode
   */
  function setMode(mode: "light" | "dark") {
    themeManager.setMode(mode);

    // Reapply theme with new mode if there's an active theme
    if (themeManager.activeThemeId) {
      applyTheme(themeManager.activeThemeId);
    }

    // Update document class
    document.documentElement.classList.toggle("dark", mode === "dark");
  }

  /**
   * Toggle between light and dark mode
   */
  function toggleMode() {
    setMode(themeManager.currentMode === "light" ? "dark" : "light");
  }

  // ============================================
  // Search & Lookup
  // ============================================

  /**
   * Get a theme by ID
   */
  function getThemeById(id: string): Theme | null {
    return themeManager.getThemeById(id);
  }

  /**
   * Search themes by name or tags
   */
  function searchThemes(query: string): Theme[] {
    return themeManager.searchThemes(query);
  }

  // ============================================
  // Import/Export
  // ============================================

  /**
   * Export a theme as JSON
   */
  function exportTheme(id: string): string | null {
    return themeManager.exportTheme(id);
  }

  /**
   * Import a theme from JSON
   */
  function importTheme(json: string): Theme | null {
    return themeManager.importTheme(json);
  }

  /**
   * Download a theme as a JSON file
   */
  function downloadTheme(id: string) {
    const theme = themeManager.getThemeById(id);
    if (!theme) return;

    const json = JSON.stringify(theme, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${theme.name.toLowerCase().replace(/\s+/g, "-")}-theme.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Upload and import a theme from file
   */
  async function uploadTheme(): Promise<Theme | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        try {
          const text = await file.text();
          const theme = importTheme(text);
          resolve(theme);
        } catch (error) {
          console.error("Failed to import theme:", error);
          resolve(null);
        }
      };

      input.click();
    });
  }

  // ============================================
  // Watchers
  // ============================================

  // Watch for mode changes and update document
  watch(
    () => themeManager.currentMode,
    (newMode) => {
      document.documentElement.classList.toggle("dark", newMode === "dark");
    },
    { immediate: true }
  );

  // ============================================
  // Color Preview Helpers
  // ============================================

  /**
   * Get color swatches for a theme (for previews)
   */
  function getThemeSwatches(theme: Theme, mode?: "light" | "dark"): string[] {
    const m = mode || themeManager.currentMode;
    const styles = theme.styles[m];
    return [styles.primary, styles.secondary, styles.accent, styles.background];
  }

  /**
   * Get primary color for a theme
   */
  function getThemePrimaryColor(theme: Theme, mode?: "light" | "dark"): string {
    const m = mode || themeManager.currentMode;
    return theme.styles[m].primary;
  }

  return {
    // State
    allThemes,
    presetThemes,
    customThemes,
    activeTheme,
    pinnedThemes,
    currentMode,
    currentStyles,
    themesBySource,

    // Theme Application
    applyTheme,
    applyPreset,

    // CRUD
    createTheme,
    updateTheme,
    deleteTheme,
    duplicateTheme,

    // Favorites
    togglePinned,
    isPinned,

    // Mode
    setMode,
    toggleMode,

    // Lookup
    getThemeById,
    searchThemes,

    // Import/Export
    exportTheme,
    importTheme,
    downloadTheme,
    uploadTheme,

    // Helpers
    getThemeSwatches,
    getThemePrimaryColor,
  };
}
