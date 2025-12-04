import type { BrandProfile, TypographyConfig, AnimationTokens } from "../types/theme";

/**
 * Apply typography configuration to document
 */
export function applyTypography(typography: TypographyConfig, element: HTMLElement = document.documentElement) {
  // Apply font families
  element.style.setProperty("--font-sans", typography.fontFamily.sans);
  element.style.setProperty("--font-serif", typography.fontFamily.serif);
  element.style.setProperty("--font-mono", typography.fontFamily.mono);
  if (typography.fontFamily.display) {
    element.style.setProperty("--font-display", typography.fontFamily.display);
  }

  // Apply font sizes
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    element.style.setProperty(`--font-size-${key}`, value);
  });

  // Apply font weights
  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    element.style.setProperty(`--font-weight-${key}`, value.toString());
  });

  // Apply line heights
  Object.entries(typography.lineHeight).forEach(([key, value]) => {
    element.style.setProperty(`--line-height-${key}`, value.toString());
  });

  // Apply letter spacing
  Object.entries(typography.letterSpacing).forEach(([key, value]) => {
    element.style.setProperty(`--letter-spacing-${key}`, value);
  });
}

/**
 * Apply animation tokens to document
 */
export function applyAnimations(animations: AnimationTokens, element: HTMLElement = document.documentElement) {
  // Apply durations
  Object.entries(animations.duration).forEach(([key, value]) => {
    element.style.setProperty(`--duration-${key}`, value);
  });

  // Apply easings
  Object.entries(animations.easing).forEach(([key, value]) => {
    element.style.setProperty(`--easing-${key}`, value);
  });

  // Apply presets
  Object.entries(animations.presets).forEach(([key, value]) => {
    element.style.setProperty(`--animation-${key}`, value);
  });
}

/**
 * Apply spacing scale to document
 */
export function applySpacing(spacing: Partial<Record<string, string>>, element: HTMLElement = document.documentElement) {
  Object.entries(spacing).forEach(([key, value]) => {
    if (value) {
      element.style.setProperty(`--spacing-${key}`, value);
    }
  });
}

/**
 * Load Google Font dynamically
 */
export function loadGoogleFont(fontFamily: string, weights: number[] = [400, 500, 600, 700]) {
  const fontName = fontFamily.split(",")[0].trim().replace(/['"]/g, "");
  
  // Check if already loaded
  const existingLink = document.querySelector(`link[data-font="${fontName}"]`);
  if (existingLink) return;

  // Create link element
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.setAttribute("data-font", fontName);
  
  // Format font family name for Google Fonts URL
  const formattedName = fontName.replace(/\s+/g, "+");
  const weightsParam = weights.join(",");
  
  link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@${weightsParam}&display=swap`;
  
  document.head.appendChild(link);
}

/**
 * Generate CSS variables object from brand profile
 */
export function generateCSSVariables(profile: BrandProfile, mode: "light" | "dark" = "light"): Record<string, string> {
  const vars: Record<string, string> = {};
  
  // Theme colors
  const themeColors = profile.theme[mode];
  Object.entries(themeColors).forEach(([key, value]) => {
    vars[`--${key}`] = value;
  });

  // Typography
  vars["--font-sans"] = profile.typography.fontFamily.sans;
  vars["--font-serif"] = profile.typography.fontFamily.serif;
  vars["--font-mono"] = profile.typography.fontFamily.mono;
  if (profile.typography.fontFamily.display) {
    vars["--font-display"] = profile.typography.fontFamily.display;
  }

  // Animation durations
  Object.entries(profile.animations.duration).forEach(([key, value]) => {
    vars[`--duration-${key}`] = value;
  });

  // Animation easings
  Object.entries(profile.animations.easing).forEach(([key, value]) => {
    vars[`--easing-${key}`] = value;
  });

  // Spacing
  if (profile.spacing) {
    Object.entries(profile.spacing).forEach(([key, value]) => {
      vars[`--spacing-${key}`] = value;
    });
  }

  return vars;
}

/**
 * Download brand profile as JSON file
 */
export function downloadProfile(profile: BrandProfile) {
  const json = JSON.stringify(profile, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${profile.name.toLowerCase().replace(/\s+/g, "-")}-brand-profile.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Upload and parse brand profile JSON file
 */
export function uploadProfile(): Promise<BrandProfile | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const profile = JSON.parse(event.target?.result as string) as BrandProfile;
          resolve(profile);
        } catch (error) {
          console.error("Failed to parse profile:", error);
          resolve(null);
        }
      };
      reader.readAsText(file);
    };

    input.click();
  });
}

/**
 * Convert image file to base64 data URL
 */
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validate brand profile structure
 */
export function validateProfile(profile: any): profile is BrandProfile {
  return (
    typeof profile === "object" &&
    profile !== null &&
    typeof profile.id === "string" &&
    typeof profile.name === "string" &&
    typeof profile.theme === "object" &&
    typeof profile.typography === "object" &&
    typeof profile.animations === "object"
  );
}
