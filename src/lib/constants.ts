export const DISCLAIMER =
  "This tool performs local static checks on files you choose in your browser. It is not antivirus software, not a security certification, not legal advice, and does not guarantee Chrome Web Store approval. Static checks can have false positives and false negatives and cannot prove an extension is safe or malicious.";

export const CHINESE_DISCLAIMER =
  "本工具仅用于本地静态自查，不是杀毒软件，不是安全认证，不保证 Chrome Web Store 审核通过，也不能证明扩展安全或恶意。";

export const LIMITS = {
  maxZipBytes: 20 * 1024 * 1024,
  maxZipFiles: 1000,
  maxSingleTextBytes: 2 * 1024 * 1024,
  maxTotalTextBytes: 10 * 1024 * 1024,
};

export const TEXT_FILE_EXTENSIONS = [
  ".js",
  ".mjs",
  ".html",
  ".htm",
  ".css",
  ".json",
];

export const CHROME_DOCS = {
  manifest:
    "https://developer.chrome.com/docs/extensions/reference/manifest",
  background:
    "https://developer.chrome.com/docs/extensions/reference/manifest/background",
  permissions:
    "https://developer.chrome.com/docs/extensions/reference/permissions-list",
  hostPermissions:
    "https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions",
  matchPatterns:
    "https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns",
  contentScripts:
    "https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts",
  csp:
    "https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy",
  remoteHostedCode:
    "https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code",
  webAccessibleResources:
    "https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources",
  externallyConnectable:
    "https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable",
  mv3Actions: "https://developer.chrome.com/blog/mv3-actions/",
};

export const DANGEROUS_PERMISSIONS = [
  "debugger",
  "cookies",
  "history",
  "nativeMessaging",
  "proxy",
  "management",
  "webRequest",
  "webRequestBlocking",
  "tabs",
  "downloads",
  "scripting",
  "bookmarks",
  "topSites",
  "clipboardRead",
  "clipboardWrite",
];

export const BROAD_HOST_PATTERNS = [
  "<all_urls>",
  "*://*/*",
  "http://*/*",
  "https://*/*",
  "file://*/*",
];
