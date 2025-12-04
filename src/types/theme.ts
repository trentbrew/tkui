export interface ThemeStyleProps {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
  sidebar: string;
  "sidebar-foreground": string;
  "sidebar-primary": string;
  "sidebar-primary-foreground": string;
  "sidebar-accent": string;
  "sidebar-accent-foreground": string;
  "sidebar-border": string;
  "sidebar-ring": string;
  "font-sans": string;
  "font-serif": string;
  "font-mono": string;
  radius: string;
  "shadow-color": string;
  "shadow-opacity": string;
  "shadow-blur": string;
  "shadow-spread": string;
  "shadow-offset-x": string;
  "shadow-offset-y": string;
  "letter-spacing": string;
  spacing?: string;
}

export interface ThemeStyles {
  light: ThemeStyleProps;
  dark: ThemeStyleProps;
}

export interface ThemeEditorState {
  preset?: string;
  styles: ThemeStyles;
  currentMode: "light" | "dark";
  hslAdjustments?: {
    hueShift: number;
    saturationScale: number;
    lightnessScale: number;
  };
}

export interface ThemePreset {
  source?: "SAVED" | "BUILT_IN";
  createdAt?: string;
  label?: string;
  styles: {
    light: Partial<ThemeStyleProps>;
    dark: Partial<ThemeStyleProps>;
  };
}

// ============================================
// Theme - Standalone first-class entity
// ============================================

export type ThemeSource = "preset" | "custom" | "brand";

/**
 * A standalone Theme entity containing colors, radius, shadows, and fonts.
 * Themes can be applied independently or referenced by Brand Profiles.
 */
export interface Theme {
  id: string;
  name: string;
  description?: string;
  
  /** Where this theme originated from */
  source: ThemeSource;
  
  /** If source is "preset", this is the preset key */
  presetKey?: string;
  
  /** The actual style values */
  styles: ThemeStyles;
  
  /** Metadata */
  createdAt: string;
  updatedAt: string;
  author?: string;
  tags?: string[];
  
  /** Whether this is a favorite/pinned theme */
  isPinned?: boolean;
}

/**
 * State for the standalone Theme manager
 */
export interface ThemeManagerState {
  /** All available themes (presets converted to Theme objects + custom) */
  themes: Theme[];
  
  /** Currently active theme ID */
  activeThemeId: string | null;
  
  /** Custom themes created by the user */
  customThemes: Theme[];
  
  /** Current color mode */
  currentMode: "light" | "dark";
}

// Typography Configuration
export interface TypographyConfig {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
    display?: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
  };
  fontWeight: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

// Logo Assets
export interface LogoAssets {
  primary?: {
    light?: string; // URL or base64
    dark?: string;
  };
  icon?: {
    light?: string;
    dark?: string;
  };
  wordmark?: {
    light?: string;
    dark?: string;
  };
  favicon?: string;
}

// Animation Tokens
export interface AnimationTokens {
  duration: {
    instant: string; // 0ms
    fast: string; // 150ms
    normal: string; // 300ms
    slow: string; // 500ms
    slower: string; // 700ms
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
    bounce: string;
  };
  presets: {
    fadeIn: string;
    fadeOut: string;
    slideIn: string;
    slideOut: string;
    scaleIn: string;
    scaleOut: string;
    spin: string;
  };
}

// Spacing Scale
export interface SpacingScale {
  "0": string;
  px: string;
  "0.5": string;
  "1": string;
  "1.5": string;
  "2": string;
  "2.5": string;
  "3": string;
  "3.5": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": string;
  "12": string;
  "14": string;
  "16": string;
  "20": string;
  "24": string;
  "28": string;
  "32": string;
  "36": string;
  "40": string;
  "44": string;
  "48": string;
  "52": string;
  "56": string;
  "60": string;
  "64": string;
  "72": string;
  "80": string;
  "96": string;
}

// Brand Profile - Complete design system
export interface BrandProfile {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  version?: string;
  
  // Theme Reference - links to a standalone Theme
  themeId?: string;
  
  // Theme Overrides - optional style overrides on top of the base theme
  themeOverrides?: {
    light?: Partial<ThemeStyleProps>;
    dark?: Partial<ThemeStyleProps>;
  };
  
  // Legacy: embedded theme (for backwards compatibility during migration)
  // @deprecated Use themeId instead
  theme?: ThemeStyles;
  
  // Typography
  typography: TypographyConfig;
  
  // Logos and Brand Assets
  logos: LogoAssets;
  
  // Animation System
  animations: AnimationTokens;
  
  // Spacing System
  spacing?: Partial<SpacingScale>;
  
  // Additional Metadata
  metadata?: {
    industry?: string;
    tags?: string[];
    website?: string;
    brandGuideUrl?: string;
  };
}

// Brand Profile Manager State
export interface BrandProfileState {
  profiles: BrandProfile[];
  activeProfileId: string | null;
  isEditing: boolean;
  editingProfileId: string | null;
}
