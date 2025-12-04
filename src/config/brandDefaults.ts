import type { TypographyConfig, AnimationTokens, SpacingScale, LogoAssets } from "../types/theme";

// Default Typography Configuration
export const defaultTypography: TypographyConfig = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    base: "1rem",       // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.75rem",   // 60px
  },
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
  },
};

// Default Animation Tokens
export const defaultAnimations: AnimationTokens = {
  duration: {
    instant: "0ms",
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "700ms",
  },
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  presets: {
    fadeIn: "opacity 300ms cubic-bezier(0, 0, 0.2, 1)",
    fadeOut: "opacity 300ms cubic-bezier(0.4, 0, 1, 1)",
    slideIn: "transform 300ms cubic-bezier(0, 0, 0.2, 1)",
    slideOut: "transform 300ms cubic-bezier(0.4, 0, 1, 1)",
    scaleIn: "transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    scaleOut: "transform 300ms cubic-bezier(0.4, 0, 1, 1)",
    spin: "transform 1000ms linear infinite",
  },
};

// Default Spacing Scale (Tailwind-like)
export const defaultSpacing: SpacingScale = {
  "0": "0px",
  px: "1px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

// Default Logo Assets (empty)
export const defaultLogos: LogoAssets = {
  primary: {
    light: undefined,
    dark: undefined,
  },
  icon: {
    light: undefined,
    dark: undefined,
  },
  wordmark: {
    light: undefined,
    dark: undefined,
  },
  favicon: undefined,
};
