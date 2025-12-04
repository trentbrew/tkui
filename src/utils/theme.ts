import type { ThemeEditorState, ThemeStyleProps, ThemeStyles } from "../types/theme";
import { COMMON_STYLES } from "../config/theme";
import * as culori from "culori";

type Theme = "dark" | "light";

const COMMON_NON_COLOR_KEYS = COMMON_STYLES;

// Color conversion utilities
export const formatNumber = (num?: number) => {
  if (!num) return "0";
  return num % 1 === 0 ? num : num.toFixed(4);
};

export const formatHsl = (hsl: culori.Hsl) => {
  return `hsl(${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%)`;
};

export type ColorFormat = "hsl" | "rgb" | "oklch" | "hex";

export const colorFormatter = (
  colorValue: string,
  format: ColorFormat = "hsl",
  tailwindVersion: "3" | "4" = "3"
): string => {
  try {
    const color = culori.parse(colorValue);
    if (!color) throw new Error("Invalid color input");

    switch (format) {
      case "hsl": {
        const hsl = culori.converter("hsl")(color);
        if (tailwindVersion === "4") {
          return formatHsl(hsl);
        }
        return `${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%`;
      }
      case "rgb":
        return culori.formatRgb(color);
      case "oklch": {
        const oklch = culori.converter("oklch")(color);
        return `oklch(${formatNumber(oklch.l)} ${formatNumber(oklch.c)} ${formatNumber(oklch.h)})`;
      }
      case "hex":
        return culori.formatHex(color);
      default:
        return colorValue;
    }
  } catch (error) {
    console.error(`Failed to convert color: ${colorValue}`, error);
    return colorValue;
  }
};

export const convertToHSL = (colorValue: string): string => colorFormatter(colorValue, "hsl");

// Apply style to element
export function applyStyleToElement(element: HTMLElement, key: string, value: string) {
  const currentStyle = element.getAttribute("style") || "";
  // Remove the existing variable definitions with the same name
  const cleanedStyle = currentStyle
    .replace(new RegExp(`--${key}:\\s*[^;]+;?`, "g"), "")
    .trim();

  element.setAttribute("style", `${cleanedStyle}--${key}: ${value};`);
}

// Set shadow variables
export function setShadowVariables(themeState: ThemeEditorState) {
  const root = document.documentElement;
  if (!root) return;

  const shadowColor = themeState.styles[themeState.currentMode]["shadow-color"];
  const shadowOpacity = themeState.styles[themeState.currentMode]["shadow-opacity"];
  const shadowBlur = themeState.styles[themeState.currentMode]["shadow-blur"];
  const shadowSpread = themeState.styles[themeState.currentMode]["shadow-spread"];
  const shadowOffsetX = themeState.styles[themeState.currentMode]["shadow-offset-x"];
  const shadowOffsetY = themeState.styles[themeState.currentMode]["shadow-offset-y"];

  if (shadowColor && shadowOpacity && shadowBlur && shadowSpread && shadowOffsetX && shadowOffsetY) {
    const shadow = `${shadowOffsetX} ${shadowOffsetY} ${shadowBlur} ${shadowSpread} ${shadowColor}`;
    applyStyleToElement(root, "shadow", shadow);
  }
}

// Update theme class
function updateThemeClass(root: HTMLElement, mode: Theme) {
  if (mode === "light") {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
}

// Apply common styles
function applyCommonStyles(root: HTMLElement, themeStyles: ThemeStyleProps) {
  Object.entries(themeStyles)
    .filter(([key]) => COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number]))
    .forEach(([key, value]) => {
      if (typeof value === "string") {
        applyStyleToElement(root, key, value);
      }
    });
}

// Apply theme colors for a specific mode
function applyThemeColors(root: HTMLElement, themeStyles: ThemeStyles, mode: Theme) {
  Object.entries(themeStyles[mode]).forEach(([key, value]) => {
    if (
      typeof value === "string" &&
      !COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number])
    ) {
      const hslValue = colorFormatter(value, "hsl", "4");
      applyStyleToElement(root, key, hslValue);
    }
  });
}

// Clear all theme color CSS variables from element's inline style
function clearThemeColors(root: HTMLElement, themeStyles: ThemeStyles) {
  const currentStyle = root.getAttribute("style") || "";
  let cleanedStyle = currentStyle;

  // Get all color keys from both modes and remove them
  const allColorKeys = new Set([
    ...Object.keys(themeStyles.light),
    ...Object.keys(themeStyles.dark),
  ]);

  allColorKeys.forEach((key) => {
    if (!COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number])) {
      cleanedStyle = cleanedStyle.replace(new RegExp(`--${key}:\\s*[^;]+;?`, "g"), "");
    }
  });

  root.setAttribute("style", cleanedStyle.trim());
}

// Inject theme styles into a <style> element for proper CSS cascade
function injectThemeStylesheet(themeStyles: ThemeStyles) {
  const styleId = "ui-thing-theme-variables";
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  // Build CSS for both :root (light) and .dark modes
  const lightVars = Object.entries(themeStyles.light)
    .filter(
      ([key]) => !COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number])
    )
    .map(([key, value]) => `  --${key}: ${colorFormatter(value as string, "hsl", "4")};`)
    .join("\n");

  const darkVars = Object.entries(themeStyles.dark)
    .filter(
      ([key]) => !COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number])
    )
    .map(([key, value]) => `  --${key}: ${colorFormatter(value as string, "hsl", "4")};`)
    .join("\n");

  styleEl.textContent = `
:root {
${lightVars}
}

.dark {
${darkVars}
}
`;
}

// Main function to apply theme to an element
export const applyThemeToElement = (themeState: ThemeEditorState, rootElement: HTMLElement) => {
  const { currentMode: mode, styles: themeStyles } = themeState;

  if (!rootElement) return;

  // Update the dark class on the element
  updateThemeClass(rootElement, mode);

  // Clear any inline color styles that would override CSS cascade
  clearThemeColors(rootElement, themeStyles);

  // Inject theme colors into stylesheet (proper CSS cascade for light/dark)
  injectThemeStylesheet(themeStyles);

  // Apply common styles (like border-radius) as inline styles - these don't change with mode
  applyCommonStyles(rootElement, themeStyles.light);

  // Apply shadow variables
  setShadowVariables(themeState);
};

// Save theme to localStorage
export function saveThemeToStorage(themeState: ThemeEditorState) {
  try {
    localStorage.setItem("ui-thing-theme", JSON.stringify(themeState));
  } catch (error) {
    console.error("Failed to save theme to storage:", error);
  }
}

// Load theme from localStorage
export function loadThemeFromStorage(): ThemeEditorState | null {
  try {
    const stored = localStorage.getItem("ui-thing-theme");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load theme from storage:", error);
    return null;
  }
}
