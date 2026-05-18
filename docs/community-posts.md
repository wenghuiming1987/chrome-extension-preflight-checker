# Community Post Templates

## English Template

Use channel-specific links during the 7-day pilot:

- Reddit: `https://<pages-domain>/from/reddit`
- X: `https://<pages-domain>/from/x`
- LinkedIn: `https://<pages-domain>/from/linkedin`
- Extension forums: `https://<pages-domain>/from/extension-forum`

### Option A

Title:  
`I built a local-only Chrome Extension Preflight Checker for release-readiness checks`

Body:  
`I just released a local-first tool for checking Chrome extension packaging quality before submission.  
It runs entirely in-browser/locally (Vite + static frontend), no backend, no APIs, and no upload of source code.  
Current checks cover Manifest V3 structure, permissions scope, CSP/scripting risks, and common publishing blockers for first-pass review preparation.  
This is not a Chrome Web Store guarantee, but a practical local checklist for teams shipping extensions faster.`

`If you want the checklist baseline and validation flow, I can share the docs.`  

`#ChromeExtension #V3 #Frontend #Security #WebTools`

### Option B

`Published a minimal local preflight checker for Chrome extensions:  
- local-only input  
- no account/login  
- no file upload to remote  
- no VirusTotal/OpenAI/Google API dependency  
- no auto-fix, only explain-and-flag  

Great for internal release gates before submitting to store.`

## 中文模板

7 天验证期建议使用渠道专属链接：

- V2EX / 开发者社区：`https://<pages-domain>/from/v2ex`
- 微信群 / 私域：`https://<pages-domain>/from/wechat`
- 知乎 / 文章评论：`https://<pages-domain>/from/zhihu`

### 模板 A

标题：  
`做了一个本地版 Chrome 扩展预检工具，先把发布前关键信息扫一遍`

正文：  
`我做了一个本地离线可运行的 Chrome 扩展 preflight checker（第一版），用于发布前快速体检。  
项目是纯前端静态页，无后端、无数据库、无账号体系，也不会上传源码到远端，支持在本地把可疑项按严重度列出来。  
适合团队在提交前做第一轮自检：Manifest、权限、脚本/行为、常见阻断项。  
它不代表 Chrome Web Store 审核通过，但能显著降低“提交后才发现问题”的时间成本。`

### 模板 B

`一个轻量的 Chrome 扩展静态预检工具，现已可本地运行：  
- 仅本地输入，不做文件上传  
- 不接任何 API（含 VirusTotal/OpenAI/Google）  
- 无自动修复，只做发现和分级提示  
- 支持本地快速复测与结果导出

用于内网/团队 review 的第一道门检查，比手工翻 manifest 快得多。`
