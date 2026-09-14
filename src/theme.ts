export type Theme = "light" | "dark";

/** Must match the inline script in index.html, which runs before the first paint. */
const STORAGE_KEY = "teyru:theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

/** The visitor's stored choice, or `null` on a first visit. */
export function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch (error) {
    return null;
  }
}

/** What `prefers-color-scheme` says right now. */
export function systemTheme(): Theme {
  return typeof window.matchMedia === "function" && window.matchMedia(DARK_QUERY).matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    // Storage disabled: the choice simply does not survive the visit.
  }
}
