import { defineStore } from "pinia";
import type { BrandProfile, BrandProfileState, ThemeStyles } from "../types/theme";
import { defaultTypography, defaultAnimations, defaultSpacing, defaultLogos } from "../config/brandDefaults";
import { defaultLightThemeStyles, defaultDarkThemeStyles } from "../config/theme";
import { brandThemePresets } from "../config/brandThemePresets";

const STORAGE_KEY = "brand-profiles";
const ACTIVE_PROFILE_KEY = "active-brand-profile";

/**
 * Build embedded theme from preset (for legacy backwards compatibility)
 * New profiles should use themeId references instead
 */
function buildThemeFromPreset(presetKey?: string): ThemeStyles | null {
  if (!presetKey) return null;
  const preset = brandThemePresets[presetKey];
  if (!preset) return null;

  return {
    light: { ...defaultLightThemeStyles, ...preset.styles.light },
    dark: { ...defaultDarkThemeStyles, ...preset.styles.dark },
  };
}

/**
 * Convert a preset key to a theme ID for the new reference system
 */
function presetKeyToThemeId(presetKey: string): string {
  return `preset-${presetKey}`;
}

export const useBrandProfileStore = defineStore("brandProfile", {
  state: (): BrandProfileState => ({
    profiles: [],
    activeProfileId: null,
    isEditing: false,
    editingProfileId: null,
  }),

  getters: {
    activeProfile: (state): BrandProfile | null => {
      if (!state.activeProfileId) return null;
      return state.profiles.find((p) => p.id === state.activeProfileId) || null;
    },

    editingProfile: (state): BrandProfile | null => {
      if (!state.editingProfileId) return null;
      return state.profiles.find((p) => p.id === state.editingProfileId) || null;
    },

    sortedProfiles: (state): BrandProfile[] => {
      return [...state.profiles].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    },
  },

  actions: {
    // Initialize from localStorage
    initialize() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.profiles = JSON.parse(stored);
        }

        const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
        if (activeId && this.profiles.find((p) => p.id === activeId)) {
          this.activeProfileId = activeId;
        }
      } catch (error) {
        console.error("Failed to load brand profiles:", error);
      }
    },

    // Save to localStorage
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
        if (this.activeProfileId) {
          localStorage.setItem(ACTIVE_PROFILE_KEY, this.activeProfileId);
        } else {
          localStorage.removeItem(ACTIVE_PROFILE_KEY);
        }
      } catch (error) {
        console.error("Failed to save brand profiles:", error);
      }
    },

    // Create new brand profile
    createProfile(
      name: string,
      options?: {
        description?: string;
        author?: string;
        copyFrom?: string; // Profile ID to copy from
        presetKey?: string; // Theme preset to start from
      }
    ): BrandProfile {
      const now = new Date().toISOString();
      const id = `profile-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      let baseProfile: BrandProfile | null = null;
      if (options?.copyFrom) {
        baseProfile = this.profiles.find((p) => p.id === options.copyFrom) || null;
      }

      const presetKey = baseProfile ? undefined : options?.presetKey;
      const presetMeta = presetKey ? brandThemePresets[presetKey] : null;

      // Determine the themeId - either from base profile, preset, or default
      let themeId: string | undefined;
      let themeOverrides: BrandProfile['themeOverrides'];
      
      if (baseProfile) {
        // Copy from existing profile
        themeId = baseProfile.themeId;
        themeOverrides = baseProfile.themeOverrides 
          ? JSON.parse(JSON.stringify(baseProfile.themeOverrides)) 
          : undefined;
      } else if (presetKey) {
        // Use preset as theme reference
        themeId = presetKeyToThemeId(presetKey);
      } else {
        // Default theme
        themeId = presetKeyToThemeId('violet-bloom');
      }

      const newProfile: BrandProfile = {
        id,
        name,
        description: options?.description || "",
        author: options?.author || "",
        createdAt: now,
        updatedAt: now,
        version: "1.0.0",
        // New system: use theme reference
        themeId,
        themeOverrides,
        // Legacy: keep for backwards compatibility during migration
        theme: baseProfile
          ? JSON.parse(JSON.stringify(baseProfile.theme))
          : presetKey
            ? buildThemeFromPreset(presetKey) || { light: { ...defaultLightThemeStyles }, dark: { ...defaultDarkThemeStyles } }
            : { light: { ...defaultLightThemeStyles }, dark: { ...defaultDarkThemeStyles } },
        typography: baseProfile
          ? JSON.parse(JSON.stringify(baseProfile.typography))
          : { ...defaultTypography },
        logos: baseProfile ? JSON.parse(JSON.stringify(baseProfile.logos)) : { ...defaultLogos },
        animations: baseProfile
          ? JSON.parse(JSON.stringify(baseProfile.animations))
          : { ...defaultAnimations },
        spacing: baseProfile?.spacing
          ? JSON.parse(JSON.stringify(baseProfile.spacing))
          : { ...defaultSpacing },
        metadata: baseProfile?.metadata
          ? JSON.parse(JSON.stringify(baseProfile.metadata))
          : {
              tags: presetMeta?.label ? [presetMeta.label] : [],
            },
      };

      this.profiles.push(newProfile);
      this.persist();

      return newProfile;
    },

    // Update existing profile
    updateProfile(id: string, updates: Partial<BrandProfile>) {
      const index = this.profiles.findIndex((p) => p.id === id);
      if (index === -1) {
        console.warn(`Profile ${id} not found`);
        return;
      }

      this.profiles[index] = {
        ...this.profiles[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      this.persist();
    },

    // Delete profile
    deleteProfile(id: string) {
      const index = this.profiles.findIndex((p) => p.id === id);
      if (index === -1) return;

      this.profiles.splice(index, 1);

      // Clear active profile if it was deleted
      if (this.activeProfileId === id) {
        this.activeProfileId = null;
      }

      // Clear editing profile if it was deleted
      if (this.editingProfileId === id) {
        this.editingProfileId = null;
        this.isEditing = false;
      }

      this.persist();
    },

    // Duplicate profile
    duplicateProfile(id: string): BrandProfile | null {
      const profile = this.profiles.find((p) => p.id === id);
      if (!profile) return null;

      return this.createProfile(`${profile.name} (Copy)`, {
        description: profile.description,
        author: profile.author,
        copyFrom: id,
      });
    },

    // Set active profile
    setActiveProfile(id: string | null) {
      if (id && !this.profiles.find((p) => p.id === id)) {
        console.warn(`Profile ${id} not found`);
        return;
      }

      this.activeProfileId = id;
      this.persist();
    },

    // Start editing profile
    startEditing(id: string) {
      if (!this.profiles.find((p) => p.id === id)) {
        console.warn(`Profile ${id} not found`);
        return;
      }

      this.editingProfileId = id;
      this.isEditing = true;
    },

    // Stop editing
    stopEditing() {
      this.editingProfileId = null;
      this.isEditing = false;
    },

    // Export profile as JSON
    exportProfile(id: string): string | null {
      const profile = this.profiles.find((p) => p.id === id);
      if (!profile) return null;

      return JSON.stringify(profile, null, 2);
    },

    // Import profile from JSON
    importProfile(json: string): BrandProfile | null {
      try {
        const profile = JSON.parse(json) as BrandProfile;

        // Validate required fields
        if (!profile.name || !profile.theme) {
          throw new Error("Invalid profile format");
        }

        // Generate new ID and timestamps
        const now = new Date().toISOString();
        const imported: BrandProfile = {
          ...profile,
          id: `profile-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: now,
          updatedAt: now,
        };

        this.profiles.push(imported);
        this.persist();

        return imported;
      } catch (error) {
        console.error("Failed to import profile:", error);
        return null;
      }
    },

    // Export all profiles
    exportAllProfiles(): string {
      return JSON.stringify(this.profiles, null, 2);
    },

    // Import multiple profiles
    importProfiles(json: string): number {
      try {
        const profiles = JSON.parse(json) as BrandProfile[];

        if (!Array.isArray(profiles)) {
          throw new Error("Invalid profiles format");
        }

        let imported = 0;
        const now = new Date().toISOString();

        for (const profile of profiles) {
          if (!profile.name || !profile.theme) continue;

          const newProfile: BrandProfile = {
            ...profile,
            id: `profile-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            createdAt: now,
            updatedAt: now,
          };

          this.profiles.push(newProfile);
          imported++;
        }

        if (imported > 0) {
          this.persist();
        }

        return imported;
      } catch (error) {
        console.error("Failed to import profiles:", error);
        return 0;
      }
    },

    // Clear all profiles (with confirmation)
    clearAllProfiles() {
      this.profiles = [];
      this.activeProfileId = null;
      this.editingProfileId = null;
      this.isEditing = false;
      this.persist();
    },
  },
});
