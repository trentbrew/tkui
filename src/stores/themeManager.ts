import { defineStore } from "pinia";
import type { Theme, ThemeStyles, ThemeStyleProps } from "../types/theme";
import { brandThemePresets } from "../config/brandThemePresets";
import { defaultLightThemeStyles, defaultDarkThemeStyles } from "../config/theme";
import { loadThemeFromStorage } from "../utils/theme";

const THEMES_STORAGE_KEY = "custom-themes";
const ACTIVE_THEME_KEY = "active-theme-id";
const PINNED_THEMES_KEY = "pinned-theme-ids";

/**
 * Convert a preset key to a Theme object
 */
function presetToTheme(presetKey: string): Theme | null {
  const preset = brandThemePresets[presetKey];
  if (!preset) return null;

  const now = new Date().toISOString();

  return {
    id: `preset-${presetKey}`,
    name: preset.label || presetKey,
    description: `Built-in ${preset.label || presetKey} theme`,
    source: "preset",
    presetKey,
    styles: {
      light: { ...defaultLightThemeStyles, ...preset.styles.light } as ThemeStyleProps,
      dark: { ...defaultDarkThemeStyles, ...preset.styles.dark } as ThemeStyleProps,
    },
    createdAt: preset.createdAt || now,
    updatedAt: preset.createdAt || now,
    tags: preset.label ? [preset.label] : [],
  };
}

/**
 * Get all preset themes as Theme objects
 */
function getAllPresetThemes(): Theme[] {
  return Object.keys(brandThemePresets)
    .map((key) => presetToTheme(key))
    .filter((t): t is Theme => t !== null);
}

export const useThemeManagerStore = defineStore("themeManager", {
  state: () => ({
    /** Custom themes created by the user */
    customThemes: [] as Theme[],

    /** Currently active theme ID (can be preset or custom) */
    activeThemeId: null as string | null,

    /** IDs of pinned/favorite themes */
    pinnedThemeIds: [] as string[],

    /** Current color mode */
    currentMode: "light" as "light" | "dark",

    /** Whether the store has been initialized */
    initialized: false,
  }),

  getters: {
    /**
     * All preset themes converted to Theme objects
     */
    presetThemes(): Theme[] {
      return getAllPresetThemes();
    },

    /**
     * All available themes (presets + custom)
     */
    allThemes(): Theme[] {
      const presets = this.presetThemes.map((t) => ({
        ...t,
        isPinned: this.pinnedThemeIds.includes(t.id),
      }));
      const custom = this.customThemes.map((t) => ({
        ...t,
        isPinned: this.pinnedThemeIds.includes(t.id),
      }));
      return [...presets, ...custom];
    },

    /**
     * Currently active theme
     */
    activeTheme(): Theme | null {
      if (!this.activeThemeId) return null;
      return this.allThemes.find((t) => t.id === this.activeThemeId) || null;
    },

    /**
     * Pinned/favorite themes
     */
    pinnedThemes(): Theme[] {
      return this.allThemes.filter((t) => this.pinnedThemeIds.includes(t.id));
    },

    /**
     * Custom themes only
     */
    customThemesList(): Theme[] {
      return this.customThemes;
    },

    /**
     * Themes grouped by source
     */
    themesBySource(): { presets: Theme[]; custom: Theme[] } {
      return {
        presets: this.presetThemes.map((t) => ({
          ...t,
          isPinned: this.pinnedThemeIds.includes(t.id),
        })),
        custom: this.customThemes.map((t) => ({
          ...t,
          isPinned: this.pinnedThemeIds.includes(t.id),
        })),
      };
    },

    /**
     * Get theme styles for the current mode
     */
    currentThemeStyles(): ThemeStyleProps | null {
      const theme = this.activeTheme;
      if (!theme) return null;
      return theme.styles[this.currentMode];
    },
  },

  actions: {
    /**
     * Initialize the store from localStorage
     */
    initialize() {
      if (this.initialized) return;

      try {
        // Load custom themes
        const storedThemes = localStorage.getItem(THEMES_STORAGE_KEY);
        if (storedThemes) {
          this.customThemes = JSON.parse(storedThemes);
        }

        // Load active theme
        const storedActiveId = localStorage.getItem(ACTIVE_THEME_KEY);
        if (storedActiveId) {
          // Verify the theme exists
          const exists =
            this.allThemes.find((t) => t.id === storedActiveId) ||
            storedActiveId.startsWith("preset-");
          if (exists) {
            this.activeThemeId = storedActiveId;
          }
        }

        // Load pinned themes
        const storedPinned = localStorage.getItem(PINNED_THEMES_KEY);
        if (storedPinned) {
          this.pinnedThemeIds = JSON.parse(storedPinned);
        }

        // Set color mode from persisted theme or existing document class; fall back to system
        const storedThemeState = loadThemeFromStorage();
        if (storedThemeState?.currentMode) {
          this.currentMode = storedThemeState.currentMode;
        } else if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
          this.currentMode = "dark";
        } else if (typeof window !== "undefined") {
          this.currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }

        this.initialized = true;
      } catch (error) {
        console.error("Failed to initialize theme manager:", error);
        this.initialized = true;
      }
    },

    /**
     * Persist state to localStorage
     */
    persist() {
      try {
        localStorage.setItem(THEMES_STORAGE_KEY, JSON.stringify(this.customThemes));

        if (this.activeThemeId) {
          localStorage.setItem(ACTIVE_THEME_KEY, this.activeThemeId);
        } else {
          localStorage.removeItem(ACTIVE_THEME_KEY);
        }

        localStorage.setItem(PINNED_THEMES_KEY, JSON.stringify(this.pinnedThemeIds));
      } catch (error) {
        console.error("Failed to persist theme manager state:", error);
      }
    },

    /**
     * Set the active theme by ID
     */
    setActiveTheme(themeId: string | null) {
      if (themeId && !this.allThemes.find((t) => t.id === themeId)) {
        console.warn(`Theme ${themeId} not found`);
        return;
      }
      this.activeThemeId = themeId;
      this.persist();
    },

    /**
     * Create a new custom theme
     */
    createTheme(options: {
      name: string;
      description?: string;
      styles?: ThemeStyles;
      basePresetKey?: string;
      author?: string;
      tags?: string[];
    }): Theme {
      const now = new Date().toISOString();
      const id = `theme-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      let styles: ThemeStyles;

      if (options.styles) {
        styles = options.styles;
      } else if (options.basePresetKey) {
        const preset = brandThemePresets[options.basePresetKey];
        if (preset) {
          styles = {
            light: { ...defaultLightThemeStyles, ...preset.styles.light } as ThemeStyleProps,
            dark: { ...defaultDarkThemeStyles, ...preset.styles.dark } as ThemeStyleProps,
          };
        } else {
          styles = {
            light: { ...defaultLightThemeStyles },
            dark: { ...defaultDarkThemeStyles },
          };
        }
      } else {
        styles = {
          light: { ...defaultLightThemeStyles },
          dark: { ...defaultDarkThemeStyles },
        };
      }

      const theme: Theme = {
        id,
        name: options.name,
        description: options.description,
        source: "custom",
        styles,
        createdAt: now,
        updatedAt: now,
        author: options.author,
        tags: options.tags || [],
      };

      this.customThemes.push(theme);
      this.persist();

      return theme;
    },

    /**
     * Update an existing custom theme
     */
    updateTheme(id: string, updates: Partial<Omit<Theme, "id" | "createdAt" | "source">>) {
      const index = this.customThemes.findIndex((t) => t.id === id);
      if (index === -1) {
        console.warn(`Theme ${id} not found or is a preset (cannot update presets)`);
        return;
      }

      this.customThemes[index] = {
        ...this.customThemes[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      this.persist();
    },

    /**
     * Delete a custom theme
     */
    deleteTheme(id: string) {
      const index = this.customThemes.findIndex((t) => t.id === id);
      if (index === -1) {
        console.warn(`Theme ${id} not found or is a preset (cannot delete presets)`);
        return;
      }

      this.customThemes.splice(index, 1);

      // Remove from pinned if present
      this.pinnedThemeIds = this.pinnedThemeIds.filter((pid) => pid !== id);

      // Clear active if this was the active theme
      if (this.activeThemeId === id) {
        this.activeThemeId = null;
      }

      this.persist();
    },

    /**
     * Duplicate a theme (creates a custom copy)
     */
    duplicateTheme(id: string): Theme | null {
      const theme = this.allThemes.find((t) => t.id === id);
      if (!theme) {
        console.warn(`Theme ${id} not found`);
        return null;
      }

      return this.createTheme({
        name: `${theme.name} (Copy)`,
        description: theme.description,
        styles: JSON.parse(JSON.stringify(theme.styles)),
        author: theme.author,
        tags: theme.tags,
      });
    },

    /**
     * Toggle pin status for a theme
     */
    togglePinned(id: string) {
      const index = this.pinnedThemeIds.indexOf(id);
      if (index === -1) {
        this.pinnedThemeIds.push(id);
      } else {
        this.pinnedThemeIds.splice(index, 1);
      }
      this.persist();
    },

    /**
     * Set the color mode
     */
    setMode(mode: "light" | "dark") {
      this.currentMode = mode;
    },

    /**
     * Toggle between light and dark mode
     */
    toggleMode() {
      this.currentMode = this.currentMode === "light" ? "dark" : "light";
    },

    /**
     * Get a theme by ID
     */
    getThemeById(id: string): Theme | null {
      return this.allThemes.find((t) => t.id === id) || null;
    },

    /**
     * Get theme by preset key
     */
    getThemeByPresetKey(presetKey: string): Theme | null {
      return this.presetThemes.find((t) => t.presetKey === presetKey) || null;
    },

    /**
     * Search themes by name or tags
     */
    searchThemes(query: string): Theme[] {
      const q = query.toLowerCase();
      return this.allThemes.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    },

    /**
     * Export a theme as JSON
     */
    exportTheme(id: string): string | null {
      const theme = this.allThemes.find((t) => t.id === id);
      if (!theme) return null;
      return JSON.stringify(theme, null, 2);
    },

    /**
     * Import a theme from JSON
     */
    importTheme(json: string): Theme | null {
      try {
        const data = JSON.parse(json) as Theme;

        if (!data.name || !data.styles) {
          throw new Error("Invalid theme format");
        }

        return this.createTheme({
          name: data.name,
          description: data.description,
          styles: data.styles,
          author: data.author,
          tags: data.tags,
        });
      } catch (error) {
        console.error("Failed to import theme:", error);
        return null;
      }
    },

    /**
     * Create a theme from brand profile's embedded theme (for migration)
     */
    createThemeFromBrandProfile(
      name: string,
      styles: ThemeStyles,
      brandProfileId: string
    ): Theme {
      const now = new Date().toISOString();
      const id = `theme-brand-${brandProfileId}`;

      // Check if already migrated
      const existing = this.customThemes.find((t) => t.id === id);
      if (existing) {
        return existing;
      }

      const theme: Theme = {
        id,
        name: `${name} Theme`,
        description: `Theme extracted from brand profile: ${name}`,
        source: "brand",
        styles,
        createdAt: now,
        updatedAt: now,
        tags: ["migrated", "brand"],
      };

      this.customThemes.push(theme);
      this.persist();

      return theme;
    },
  },
});
