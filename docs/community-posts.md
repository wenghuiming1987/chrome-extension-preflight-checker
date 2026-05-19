# Community Post Templates

Use these drafts during the 7-day validation run. Keep the tone transparent: this is a free beta and demand test, not a certified security product.

Main site:

`https://chrome-extension-preflight-checker.pages.dev/`

## Hacker News

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/hackernews`

Title:

`Show HN: Local preflight checker for Chrome extensions`

First comment:

```text
I built this as a local-only static tool for checking Chrome extension packages before submission.

It reads manifest.json or extension.zip in the browser, looks for common MV3 compatibility issues, broad permissions, host_permissions, CSP problems, remote script usage, and dynamic execution patterns, then exports a Markdown report.

There is no backend, login, API, database, file upload, VirusTotal/OpenAI/Google integration, or approval guarantee. It is only a static preflight checklist, and I am trying to validate whether extension developers actually need this before I expand it.

I would especially appreciate feedback from people who have shipped or had a Chrome extension rejected.
```

## Reddit

Post only after reading the target subreddit rules. If the subreddit disallows self-promotion, do not post this as a standalone link.

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/reddit`

Title:

`I built a local-only Chrome extension preflight checker. Looking for feedback from extension developers.`

Body:

```text
I built a small free beta tool for Chrome extension developers and I am looking for practical feedback before expanding it.

It runs locally in the browser and checks manifest.json or extension.zip for common pre-submission issues:

- Manifest V3 compatibility
- broad permissions and host_permissions
- content_scripts matches, all_frames, document_start
- CSP issues such as unsafe-eval and remote script sources
- remote scripts and dynamic execution patterns in local JS/HTML files
- Markdown report export

No backend, no login, no API, no upload of source code.

It is not antivirus software, not a security certification, and does not guarantee Chrome Web Store approval. It is just a static preflight report.

If you build Chrome extensions, I would appreciate feedback on whether the report is useful and which checks are missing.

Tool:
https://chrome-extension-preflight-checker.pages.dev/from/reddit
```

## Indie Hackers

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/indiehackers`

Title:

`I built a local-only Chrome extension preflight checker to validate a small dev-tool idea`

Body:

```text
I am testing a small dev-tool idea before adding more features or buying a domain.

The product: a free Chrome Extension Preflight Checker that runs entirely in the browser. Users upload manifest.json or extension.zip locally, and the tool generates a readable report for MV3 compatibility, permissions risk, host_permissions, content_scripts, CSP, remote code patterns, and dynamic execution patterns.

What it intentionally does not do:

- no backend
- no database
- no login
- no API
- no file upload
- no VirusTotal/OpenAI/Google integration
- no Chrome Web Store approval guarantee
- no automatic source fix

I am trying to validate whether extension developers, agencies, or indie hackers shipping browser extensions would use this before submission or before a manual review.

Test link:
https://chrome-extension-preflight-checker.pages.dev/from/indiehackers

The question I am trying to answer this week: would you use a local static report like this before submitting an extension, and would you pay for a human review if the extension was rejected?
```

## X

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/x`

Post:

```text
Free local-only Chrome Extension Preflight Checker.
Upload manifest.json or extension.zip in your browser. No backend, login, API, or source upload.
Flags MV3, permissions, CSP, remote-code and dynamic-execution risks.
https://chrome-extension-preflight-checker.pages.dev/from/x
```

Character count: 278

## LinkedIn

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/linkedin`

Post:

```text
I am validating a small developer tool for Chrome extension teams:

Chrome Extension Preflight Checker

It is a free, local-only static checker for manifest.json and extension.zip packages. The tool runs in the browser and generates a readable report covering Manifest V3 compatibility, permissions, host_permissions, content_scripts, CSP, remote script usage, and dynamic execution patterns.

No backend. No login. No API. No file upload. No approval guarantee.

The goal is not to certify an extension. The goal is to catch common static review risks before a Chrome Web Store submission or before a human review.

I am looking for feedback from people who have shipped Chrome extensions, worked through MV3 migration, or dealt with Chrome Web Store rejection.

Test link:
https://chrome-extension-preflight-checker.pages.dev/from/linkedin
```

## V2EX / Chinese Developer Forum

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/v2ex`

Title:

`做了一个本地版 Chrome 扩展发布前预检工具，想找真实扩展样本验证`

Body:

```text
做了一个 Chrome Extension Preflight Checker，想用 7 天验证一下是否真有需求。

它是纯前端静态工具，支持本地读取 manifest.json 或 extension.zip，在浏览器里分析，不上传源码、不需要登录、不接任何 API。

第一版主要检查：

- Manifest V3 兼容性
- permissions / host_permissions 是否过宽
- content_scripts matches、all_frames、document_start
- CSP 里的 unsafe-eval、远程 script-src / worker-src
- HTML / JS 里的远程脚本
- eval / new Function / setTimeout 字符串等动态执行风险
- Markdown 报告导出

它不是杀毒软件，不是安全认证，不保证 Chrome Web Store 审核通过，也不能证明扩展安全或恶意。定位只是发布前静态自查。

如果你做过 Chrome 扩展，尤其是遇到过 MV3 迁移、权限过宽、CSP、远程代码、商店被拒，欢迎试一下并给我反馈：报告是否有用、哪些规则缺失、是否愿意在上架前找人工 review。

测试地址：
https://chrome-extension-preflight-checker.pages.dev/from/v2ex
```

## Juejin

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/juejin`

Title:

`一个本地版 Chrome 扩展预检工具：提交商店前先扫 Manifest、权限、CSP`

Body:

```text
我做了一个免费测试版 Chrome Extension Preflight Checker，用来验证一个很小的开发者工具需求。

使用方式很简单：上传 manifest.json 或 extension.zip，浏览器本地解析，生成一份可读的整改报告。

重点边界：

- 文件不上传
- 没有后端
- 没有登录
- 没有数据库
- 不接 VirusTotal / OpenAI / Google API
- 不做病毒扫描
- 不保证 Chrome Web Store 审核通过

第一版检查 MV3 兼容性、危险权限、host_permissions、content_scripts、CSP、远程脚本和动态执行风险。

如果你做过 Chrome 扩展，欢迎拿真实项目试一下。我现在最想验证的是：这个报告对提交前自查有没有实际价值。

测试地址：
https://chrome-extension-preflight-checker.pages.dev/from/juejin
```

## WeChat / Private Groups

Submission URL:

`https://chrome-extension-preflight-checker.pages.dev/from/wechat`

Message:

```text
我做了一个免费测试版 Chrome 扩展发布前预检工具，想找几个真实扩展样本验证一下。

地址：
https://chrome-extension-preflight-checker.pages.dev/from/wechat

功能：本地读取 manifest.json 或 extension.zip，检查 MV3、权限、host_permissions、content_scripts、CSP、远程脚本、eval/new Function 等风险，并导出 Markdown 报告。

重要说明：文件只在浏览器本地处理，不上传；没有后端、登录、数据库或 API；不是杀毒软件，不是安全认证，也不保证商店审核通过。

如果你做过 Chrome 扩展，帮我试一下报告是否有用。尤其想看真实扩展的反馈。
```
