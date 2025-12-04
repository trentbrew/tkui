import { computed, watch, onMounted } from "vue";
import { useThemeStore } from "../stores/theme";
import { applyThemeToElement, saveThemeToStorage, loadThemeFromStorage } from "../utils/theme";

export function useTheme() {
  const themeStore = useThemeStore();

  // Load theme from storage on mount
  onMounted(() => {
    const stored = loadThemeFromStorage();
    if (stored) {
      themeStore.setThemeState(stored);
    }
    applyTheme();
  });

  // Apply theme whenever it changes
  watch(
    () => themeStore.themeState,
    () => {
      applyTheme();
      saveThemeToStorage(themeStore.themeState);
    },
    { deep: true }
  );

  function applyTheme() {
    const root = document.documentElement;
    if (!root) return;

    applyThemeToElement(themeStore.themeState, root);
  }

  const theme = computed(() => themeStore.currentMode);
  const setTheme = (newTheme: "light" | "dark") => {
    themeStore.setThemeState({
      ...themeStore.themeState,
      currentMode: newTheme,
    });
  };

  const toggleTheme = (coords?: { x: number; y: number }) => {
    const root = document.documentElement;
    const newMode = themeStore.currentMode === "light" ? "dark" : "light";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newMode);
      return;
    }

    if (coords) {
      root.style.setProperty("--x", `${coords.x}px`);
      root.style.setProperty("--y", `${coords.y}px`);
    }

    document.startViewTransition(() => {
      setTheme(newMode);
    });
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    themeStore,
  };
}
