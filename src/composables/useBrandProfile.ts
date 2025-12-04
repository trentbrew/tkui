import { computed, watch } from "vue";
import { useBrandProfileStore } from "../stores/brandProfile";
import { useThemeStore } from "../stores/theme";
import { useThemeManagerStore } from "../stores/themeManager";
import { applyTypography, applyAnimations, applySpacing } from "../utils/brandProfile";
import { applyThemeToElement } from "../utils/theme";
import type { ThemeStyles, ThemeStyleProps } from "../types/theme";

export function useBrandProfile() {
  const brandStore = useBrandProfileStore();
  const themeStore = useThemeStore();
  const themeManager = useThemeManagerStore();

  // Initialize on first use
  if (brandStore.profiles.length === 0) {
    brandStore.initialize();
  }
  
  // Initialize theme manager if needed
  if (!themeManager.initialized) {
    themeManager.initialize();
  }

  const activeProfile = computed(() => brandStore.activeProfile);
  const profiles = computed(() => brandStore.sortedProfiles);
  const isEditing = computed(() => brandStore.isEditing);
  const editingProfile = computed(() => brandStore.editingProfile);

  /**
   * Apply brand profile to document
   */
  function applyBrandProfile(profileId: string | null) {
    if (!profileId) {
      // Reset to default theme
      themeStore.setThemeState({
        preset: "violet-bloom",
        styles: themeStore.currentStyles,
        currentMode: themeStore.currentMode,
      });
      return;
    }

    const profile = brandStore.profiles.find((p) => p.id === profileId);
    if (!profile) return;

    // Resolve theme styles - either from themeId reference or deprecated embedded theme
    let resolvedStyles: ThemeStyles;
    
    if (profile.themeId) {
      // New system: resolve theme from themeId and apply overrides
      const theme = themeManager.getThemeById(profile.themeId);
      if (theme) {
        // Start with base theme styles
        resolvedStyles = {
          light: { ...theme.styles.light },
          dark: { ...theme.styles.dark },
        };
        
        // Apply any overrides
        if (profile.themeOverrides) {
          if (profile.themeOverrides.light) {
            resolvedStyles.light = { ...resolvedStyles.light, ...profile.themeOverrides.light };
          }
          if (profile.themeOverrides.dark) {
            resolvedStyles.dark = { ...resolvedStyles.dark, ...profile.themeOverrides.dark };
          }
        }
      } else {
        // Theme not found, use fallback
        console.warn(`Theme ${profile.themeId} not found, using default`);
        resolvedStyles = themeStore.currentStyles;
      }
    } else if (profile.theme) {
      // Legacy system: use embedded theme directly
      resolvedStyles = profile.theme;
    } else {
      // No theme defined, use current
      resolvedStyles = themeStore.currentStyles;
    }

    // Create theme state from resolved profile
    const themeState = {
      preset: `brand-${profileId}`,
      styles: resolvedStyles,
      currentMode: themeStore.currentMode,
    };

    // Apply theme colors
    applyThemeToElement(themeState, document.documentElement);

    // Apply typography
    applyTypography(profile.typography);

    // Apply animations
    applyAnimations(profile.animations);

    // Apply spacing if defined
    if (profile.spacing) {
      applySpacing(profile.spacing);
    }

    // Update theme store
    themeStore.setThemeState(themeState);

    // Set as active
    brandStore.setActiveProfile(profileId);
  }

  /**
   * Create new brand profile
   */
  function createProfile(
    name: string,
    options?: { description?: string; author?: string; presetKey?: string; copyFrom?: string }
  ) {
    const profile = brandStore.createProfile(name, options);
    return profile;
  }

  /**
   * Update brand profile
   */
  function updateProfile(id: string, updates: Partial<Parameters<typeof brandStore.updateProfile>[1]>) {
    brandStore.updateProfile(id, updates);

    // Reapply if it's the active profile
    if (brandStore.activeProfileId === id) {
      applyBrandProfile(id);
    }
  }

  /**
   * Delete brand profile
   */
  function deleteProfile(id: string) {
    brandStore.deleteProfile(id);
  }

  /**
   * Duplicate brand profile
   */
  function duplicateProfile(id: string) {
    return brandStore.duplicateProfile(id);
  }

  /**
   * Start editing a profile
   */
  function startEditing(id: string) {
    brandStore.startEditing(id);
  }

  /**
   * Stop editing
   */
  function stopEditing() {
    brandStore.stopEditing();
  }

  /**
   * Export profile as JSON
   */
  function exportProfile(id: string) {
    return brandStore.exportProfile(id);
  }

  /**
   * Import profile from JSON
   */
  function importProfile(json: string) {
    return brandStore.importProfile(json);
  }

  // Watch for active profile changes
  watch(
    () => brandStore.activeProfileId,
    (newId) => {
      if (newId) {
        applyBrandProfile(newId);
      }
    }
  );

  // Watch for theme mode changes
  watch(
    () => themeStore.currentMode,
    () => {
      if (brandStore.activeProfileId) {
        applyBrandProfile(brandStore.activeProfileId);
      }
    }
  );

  return {
    // State
    activeProfile,
    profiles,
    isEditing,
    editingProfile,

    // Actions
    applyBrandProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    duplicateProfile,
    startEditing,
    stopEditing,
    exportProfile,
    importProfile,
  };
}
