/** The three locales the landing page ships. */
export const LANGS = ["zh-TW", "zh-CN", "en"] as const;

export type Lang = (typeof LANGS)[number];

export type MessageKey =
  | "description"
  | "tagline"
  | "docsCta"
  | "installLabel"
  | "requiresNote"
  | "copy"
  | "copied"
  | "factsTitle"
  | "factNativeLabel"
  | "factNativeText"
  | "factStdlibLabel"
  | "factStdlibText"
  | "factDigestLabel"
  | "factDigestText"
  | "factLombokLabel"
  | "factLombokText"
  | "factWebLabel"
  | "factWebText"
  | "factSessionLabel"
  | "factSessionText"
  | "factValidationLabel"
  | "factValidationText"
  | "factUploadLabel"
  | "factUploadText"
  | "factHttpLabel"
  | "factHttpText"
  | "factWebSocketLabel"
  | "factWebSocketText"
  | "factThreadsLabel"
  | "factThreadsText"
  | "factJsonLabel"
  | "factJsonText"
  | "factGcLabel"
  | "factGcText"
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
  requiresNote: "需要 Go，以及 clang 或 gcc。",
  copy: "複製",
  copied: "已複製",
  factsTitle: "它是什麼",
  factNativeLabel: "原生執行檔",
  factNativeText: "經由 Go 前端、產生的 C 與 clang/LLVM，編成原生執行檔——沒有 JVM，沒有 bytecode。",
  factStdlibLabel: "標準程式庫",
  factStdlibText:
    "以 Teyru 本身撰寫，與每個程式一起編譯與檢查：集合、Gson 形狀的 JSON 綁定、規則表達式、stream、時間與文字。",
  factDigestLabel: "摘要與位元組",
  factDigestText:
    "MessageDigest（MD5、SHA-1、SHA-224／256／384／512）、CRC32 與 HexFormat 都在 Teyru 裡實作；緩衝與二進位資料流說 Java 的 modified UTF-8，還有一個 Scanner。",
  factLombokLabel: "標註",
  factLombokText: "相容 Lombok，在語意分析階段展開成一般的成員。",
  factWebLabel: "Web 框架",
  factWebText:
    "HTTP/1.1 伺服器上的 Spring 形狀容器與 web 層：SpringApplication.run 讀 application.properties，@ConfigurationProperties 綁定設定、@Profile 篩選 bean，還有 @ControllerAdvice、攔截器、靜態檔案與 CORS；路由在編譯期產生。",
  factSessionLabel: "會話",
  factSessionText:
    "Sessions.of(req) 找出請求 cookie 指到的會話；cookie 由伺服器在回應送出前蓋上，所以同一段請求共用一個身分。",
  factValidationLabel: "驗證",
  factValidationText:
    "@NotNull、@Size、@Min、@Max 標在欄位上，由 Validation.check 檢查；綁定出來的物件違反約束時是 400，並指出是哪個欄位。",
  factUploadLabel: "檔案上傳",
  factUploadText:
    "HttpRequest.multipart(name) 取回 multipart 表單裡的那個部分，型別是 MultipartFile：欄位名、原始檔名、Content-Type、內容。",
  factHttpLabel: "HTTP 客戶端",
  factHttpText:
    "Http.get 與 HttpClient 直接送出請求，keep-alive 連線可以接著用；接收迴圈（ServerTask）能跑在自己的執行緒上，所以客戶端與伺服器可以活在同一個程式裡。",
  factWebSocketLabel: "WebSocket",
  factWebSocketText:
    "實作 WebSocketHandler、標上 @WebSocketMapping，就與 controller 一樣被宣告；WebSocketSession 是升級後的那條連線。",
  factThreadsLabel: "執行緒",
  factThreadsText:
    "真正的作業系統執行緒、真正的 synchronized（含方法修飾子）與 Object.wait／notify，加上執行器、latch、原子型別與並行 map——後面這些全部是監視器，不是 lock-free。",
  factJsonLabel: "JSON 綁定",
  factJsonText: "Gson 形狀，物件綁定由編譯器產生。",
  factGcLabel: "垃圾回收",
  factGcText: "C 執行期的保守式標記清除回收器，沒有任何虛擬機。",
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
  requiresNote: "需要 Go，以及 clang 或 gcc。",
  copy: "复制",
  copied: "已复制",
  factsTitle: "它是什么",
  factNativeLabel: "原生可执行文件",
  factNativeText: "经由 Go 前端、生成的 C 与 clang/LLVM，编译成原生可执行文件——没有 JVM，没有字节码。",
  factStdlibLabel: "标准库",
  factStdlibText:
    "用 Teyru 本身编写，与每个程序一起编译与检查：集合、Gson 形状的 JSON 绑定、正则表达式、stream、时间与文本。",
  factDigestLabel: "摘要与字节",
  factDigestText:
    "MessageDigest（MD5、SHA-1、SHA-224／256／384／512）、CRC32 与 HexFormat 都在 Teyru 里实现；缓冲与二进制数据流说 Java 的 modified UTF-8，还有一个 Scanner。",
  factLombokLabel: "注解",
  factLombokText: "兼容 Lombok，在语义分析阶段展开成普通的成员。",
  factWebLabel: "Web 框架",
  factWebText:
    "HTTP/1.1 服务器上的 Spring 形状容器与 web 层：SpringApplication.run 读 application.properties，@ConfigurationProperties 绑定配置、@Profile 筛选 bean，还有 @ControllerAdvice、拦截器、静态文件与 CORS；路由在编译期生成。",
  factSessionLabel: "会话",
  factSessionText:
    "Sessions.of(req) 找出请求 cookie 指到的会话；cookie 由服务器在响应送出前盖上，所以同一段请求共用一个身份。",
  factValidationLabel: "验证",
  factValidationText:
    "@NotNull、@Size、@Min、@Max 标在字段上，由 Validation.check 检查；绑定出来的对象违反约束时是 400，并指出是哪个字段。",
  factUploadLabel: "文件上传",
  factUploadText:
    "HttpRequest.multipart(name) 取回 multipart 表单里的那个部分，类型是 MultipartFile：字段名、原始文件名、Content-Type、内容。",
  factHttpLabel: "HTTP 客户端",
  factHttpText:
    "Http.get 与 HttpClient 直接发出请求，keep-alive 连接可以接着用；接收循环（ServerTask）能跑在自己的线程上，所以客户端与服务器可以活在同一个程序里。",
  factWebSocketLabel: "WebSocket",
  factWebSocketText:
    "实现 WebSocketHandler、标上 @WebSocketMapping，就和 controller 一样被声明；WebSocketSession 是升级后的那条连接。",
  factThreadsLabel: "线程",
  factThreadsText:
    "真正的操作系统线程、真正的 synchronized（含方法修饰符）与 Object.wait／notify，加上执行器、latch、原子类型与并发 map——后面这些全部是监视器，不是 lock-free。",
  factJsonLabel: "JSON 绑定",
  factJsonText: "Gson 形状，对象绑定由编译器生成。",
  factGcLabel: "垃圾回收",
  factGcText: "C 运行时的保守式标记清除回收器，没有任何虚拟机。",
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
  requiresNote: "Requires Go and clang or gcc.",
  copy: "Copy",
  copied: "Copied",
  factsTitle: "What it is",
  factNativeLabel: "Native binary",
  factNativeText:
    "Compiled through a Go front end, generated C and clang/LLVM into a native executable — no JVM, no bytecode.",
  factStdlibLabel: "Standard library",
  factStdlibText:
    "Written in Teyru itself — collections, Gson-shaped JSON, regular expressions, streams, time and text — and compiled and checked together with every program.",
  factDigestLabel: "Digests and bytes",
  factDigestText:
    "MessageDigest (MD5, SHA-1, SHA-224/256/384/512), CRC32 and HexFormat are implemented in Teyru, and the buffered and binary streams speak Java's modified UTF-8. There is a Scanner too.",
  factLombokLabel: "Annotations",
  factLombokText: "Lombok-compatible, expanded into ordinary members during semantic analysis.",
  factWebLabel: "Web framework",
  factWebText:
    "A Spring-shaped container and web layer over an HTTP/1.1 server: SpringApplication.run reads application.properties, @ConfigurationProperties binds it, @Profile picks beans, and advice, interceptors, static files and CORS are all there — with the routes compiled.",
  factSessionLabel: "Sessions",
  factSessionText:
    "Sessions.of(req) finds the session a request's cookie names, and the server stamps that cookie on the answer on the way out, so a run of requests has one identity.",
  factValidationLabel: "Validation",
  factValidationText:
    "@NotNull, @Size, @Min and @Max on a field, checked by Validation.check; a bound body that breaks one is a 400 that says which field.",
  factUploadLabel: "Uploads",
  factUploadText:
    "HttpRequest.multipart(name) hands back the part a multipart form sent, as a MultipartFile: field name, original filename, content type, bytes.",
  factHttpLabel: "HTTP client",
  factHttpText:
    "Http.get and HttpClient send real requests and reuse a keep-alive connection, and the accept loop (ServerTask) runs on a thread — a client and a server in one program.",
  factWebSocketLabel: "WebSocket",
  factWebSocketText:
    "Implement WebSocketHandler and mark it @WebSocketMapping to have it declared like a controller; WebSocketSession is the connection after the upgrade.",
  factThreadsLabel: "Threads",
  factThreadsText:
    "Real operating system threads, real synchronized (the method modifier too) and Object.wait/notify, plus executors, latches, atomics and a concurrent map — those last ones are monitors, not lock-free.",
  factJsonLabel: "JSON binding",
  factJsonText: "Gson-shaped, with the object binding generated by the compiler.",
  factGcLabel: "Garbage collector",
  factGcText: "A C runtime with a conservative mark-and-sweep collector and no virtual machine.",
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
