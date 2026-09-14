import {
  detectLang,
  INSTALL_COMMAND,
  isLang,
  isMessageKey,
  LANG_LABELS,
  LANG_OG_LOCALES,
  LANGS,
  MESSAGES,
  persistLang,
  storedLang,
  type Lang,
} from "./i18n.js";
import { applyTheme, persistTheme, storedTheme, systemTheme, type Theme } from "./theme.js";

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}

function applyLang(lang: Lang): void {
  const messages = MESSAGES[lang];

  for (const element of document.querySelectorAll<HTMLElement>("[data-i18n]")) {
    const key = element.dataset.i18n;
    if (key !== undefined && isMessageKey(key)) {
      element.textContent = messages[key];
    }
  }
  for (const element of document.querySelectorAll<HTMLElement>("[data-i18n-aria]")) {
    const key = element.dataset.i18nAria;
    if (key !== undefined && isMessageKey(key)) {
      element.setAttribute("aria-label", messages[key]);
    }
  }

  document.documentElement.lang = lang;
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ]) {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", messages.description);
  }
  document
    .querySelector<HTMLMetaElement>('meta[property="og:locale"]')
    ?.setAttribute("content", LANG_OG_LOCALES[lang]);
}

function initLanguage(): void {
  const select = required<HTMLSelectElement>("#language");

  for (const lang of LANGS) {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = LANG_LABELS[lang];
    select.append(option);
  }

  const stored = storedLang();
  const initial: Lang =
    stored ?? detectLang(navigator.languages.length > 0 ? navigator.languages : [navigator.language]);

  select.value = initial;
  applyLang(initial);

  select.addEventListener("change", () => {
    const value = select.value;
    if (isLang(value)) {
      persistLang(value);
      applyLang(value);
    }
  });
}

function initTheme(): void {
  const button = required<HTMLButtonElement>("#theme");

  // index.html already set the attribute before the first paint; this re-derives
  // the same value so the button and the document stay in step.
  let theme: Theme = storedTheme() ?? systemTheme();
  applyTheme(theme);

  button.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    persistTheme(theme);
  });
}

initLanguage();
initTheme();
required<HTMLElement>("#install-command").textContent = INSTALL_COMMAND;
