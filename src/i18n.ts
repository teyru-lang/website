/** The three locales the landing page ships. */
export const LANGS = ["zh-TW", "zh-CN", "en"] as const;

export type Lang = (typeof LANGS)[number];

export type MessageKey =
  | "description"
  | "tagline"
  | "docsCta"
  | "installLabel"
  | "footerDocs"
  | "footerGithub"
  | "themeLabel"
  | "langLabel";

export type Messages = Readonly<Record<MessageKey, string>>;

/** Native names: the language control reads the same whichever locale is active. */
export const LANG_LABELS: Readonly<Record<Lang, string>> = {
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  en: "English",
};

/** Value for `og:locale`. */
export const LANG_OG_LOCALES: Readonly<Record<Lang, string>> = {
  "zh-TW": "zh_TW",
  "zh-CN": "zh_CN",
  en: "en_US",
};

/** Shown in the footer; a command, so it is identical in every locale. */
export const INSTALL_COMMAND = "go install github.com/teyru-lang/Teyru/cmd/teyru@latest";

const zhTW: Messages = {
  description:
    "Teyru 是一門 Java 形狀的程式語言，直接編譯成原生執行檔：.teyru 原始碼經由 Go 編譯器與 C 交給 clang/LLVM。沒有 JVM，沒有 bytecode。",
  tagline: "Java 形狀的語言，直接編譯成原生執行檔。沒有 JVM，沒有 bytecode。",
  docsCta: "閱讀文件",
  installLabel: "安裝編譯器",
  footerDocs: "文件",
  footerGithub: "GitHub",
  themeLabel: "切換淺色與深色主題",
  langLabel: "語言",
};

const zhCN: Messages = {
  description:
    "Teyru 是一门 Java 形状的编程语言，直接编译成原生可执行文件：.teyru 源码经由 Go 编译器与 C 交给 clang/LLVM。没有 JVM，没有字节码。",
  tagline: "Java 形状的语言，直接编译成原生可执行文件。没有 JVM，没有字节码。",
  docsCta: "阅读文档",
  installLabel: "安装编译器",
  footerDocs: "文档",
  footerGithub: "GitHub",
  themeLabel: "切换浅色与深色主题",
  langLabel: "语言",
};

const en: Messages = {
  description:
    "Teyru is a language in the shape of Java that compiles straight to a native executable. No JVM, no bytecode.",
  tagline: "A Java-shaped language that compiles to a native binary. No JVM, no bytecode.",
  docsCta: "Read the documentation",
  installLabel: "Install the compiler",
  footerDocs: "Documentation",
  footerGithub: "GitHub",
  themeLabel: "Switch between the light and dark theme",
  langLabel: "Language",
};

export const MESSAGES: Readonly<Record<Lang, Messages>> = {
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  en,
};

export const MESSAGE_KEYS: readonly MessageKey[] = Object.keys(en) as MessageKey[];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function isMessageKey(value: string): value is MessageKey {
  return (MESSAGE_KEYS as readonly string[]).includes(value);
}

const STORAGE_KEY = "teyru:lang";

export function storedLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value !== null && isLang(value) ? value : null;
  } catch (error) {
    return null;
  }
}

export function persistLang(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    // Storage disabled: the choice simply does not survive the visit.
  }
}

/**
 * Picks a locale from an Accept-Language-shaped preference list, in order.
 * Traditional Chinese wins for a bare `zh` because it is the source language.
 */
export function detectLang(languages: readonly string[]): Lang {
  let sawBareChinese = false;
  for (const raw of languages) {
    const tag = raw.toLowerCase();
    if (tag === "zh" || tag.startsWith("zh-")) {
      if (/(hant|-tw|-hk|-mo)/.test(tag)) {
        return "zh-TW";
      }
      if (/(hans|-cn|-sg)/.test(tag)) {
        return "zh-CN";
      }
      sawBareChinese = true;
      continue;
    }
    if (tag === "en" || tag.startsWith("en-")) {
      return "en";
    }
  }
  return sawBareChinese ? "zh-TW" : "en";
}
