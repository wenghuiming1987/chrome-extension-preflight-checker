# Chrome Extension Preflight Checker - Dev Log

## 2026-05-18

### 本次改动范围

- 在仓库根目录创建/更新 `README.md`，补齐：
  - 项目定位与边界
  - 本地运行与构建命令
  - Cloudflare Pages 与 GitHub Pages 部署说明
  - 非后端/非外部依赖与不可承诺项说明

- 新建并完善 `docs/validation-plan.md`，包含：
  - 7 天市场验证计划
  - 上传转化、报告生成、报告导出、真实样本、有效反馈、人工审查咨询指标
  - 不达标时不扩功能、不买域名的停止规则

- 新建 `docs/community-posts.md`，提供：
  - 英文帖子模板（含 2 个版本）
  - 中文帖子模板（含 2 个版本）

- 新建 `docs/rule-reference.md`，包含：
  - v1 规则清单
  - 严重度等级定义
  - Chrome 官方文档链接

- 新建 `docs/dev-log.md`，记录本次文档工作范围与后续事项。

- 增加验证期轻量监控：
  - `public/_redirects` 支持 `/from/<channel>` 和 `/event/<channel>/<step>` 静态回退
  - 前端用 History API 记录上传、报告生成、导出、人工审查点击等虚拟路径
  - README 和验证计划记录 Cloudflare Web Analytics 监控方式

### 约束执行情况

- 本次项目包含前端工具实现、示例样本、验证文档和部署说明。
- 明确写明并统一了以下限制项：无后端、无数据库、无登录、无 API、无文件上传、无病毒扫描、无安全认证、无 Chrome Web Store 保证、无 URL 扫描、无动态沙箱、无自动源码修复。

### TODO（后续）

- 增加 `docs/faq.md`（针对常见误报与 false positive 场景）
- 使用 `docs/outreach-tracker.md` 记录 7 天验证期外链、上传、导出、人工审查咨询
- 补齐 `docs/changelog.md` 的版本迭代记录模板
- 为 Cloudflare Pages 与 GitHub Pages 提供统一的截图化验收清单
- 7 天验收结束后基于真实结果回写阈值（必要时微调）

## 2026-05-19

### 外链验证准备

- 新增 `docs/outreach-plan.md`：
  - 固化 7 天外链执行计划
  - 写明每个渠道的独立追踪路径
  - 约束不买链接、不群发、不做垃圾外链
  - 加入 Hacker News / Reddit 相关发帖规则参考

- 新增 `docs/outreach-tracker.md`：
  - 发布记录表
  - 每日漏斗统计表
  - 有效反馈记录表
  - 人工审查咨询记录表

- 更新 `docs/community-posts.md`：
  - 替换占位域名为真实 Cloudflare Pages 地址
  - 增加 Hacker News、Reddit、Indie Hackers、X、LinkedIn、V2EX、Juejin、WeChat 的可复制发帖文案
  - 每条文案继续保留本地处理、无上传、无认证、无审核保证的边界声明

- 更新 `docs/validation-plan.md`：
  - 指向新的外链计划与追踪表，方便 7 天验证期执行。

- 更新外链执行节奏：
  - 每天目标最多 3 条公开外链动作
  - 以真实问题回复优先，质量目录补充
  - 每条必须先过规则审查、先解决问题、最多放 1 个相关链接
  - 如果当天找不到 3 个合规机会，宁可少发，不强行补数量

- 固化子代理分工：
  - 重复搜索、候选整理、规则片段收集等低判断任务优先交给 `gpt-5.3-codex-spark`
  - 主代理负责筛选、判断、风险审查、回复质量和最终确认
  - 子代理不得登录、提交、发帖或填写个人信息

## 2026-05-21

### 首次使用转化优化

- 将默认首屏报告从低风险样例改为高风险样例，让新访客无需准备文件也能立即看到工具可发现的问题类型。
- 强化上传入口：
  - Hero 主按钮改为 `Analyze your extension`
  - 报告摘要中为样例报告增加提示，并提供上传真实扩展入口
  - 上传区增加 `No extension file ready?` 样例引导
- 增加更细的验证期行为路径：
  - `choose-file-click` 用于观察用户是否点开上传入口
  - `sample-high` / `sample-low` 用于观察无文件用户是否试用样例报告
- 更新 `README.md` 与 `docs/validation-plan.md`，把新增行为路径纳入 Cloudflare Web Analytics 观察口径。

## 2026-05-22

### 市场验证定位调整

- 根据早期验证反馈和外部市场分析，将首屏从泛化的 `Preflight Checker` 调整为更痛点化的 Chrome Web Store rejection / review readiness 方向。
- Hero H1 改为 `Catch Chrome Web Store rejections before review`，副标题强调 MV3、broad permissions、host access、CSP、remote code、dynamic execution 这些可能导致被拒或审核卡住的静态信号。
- 调整首屏 CTA 优先级：
  - 主 CTA：`Try sample manifest`
  - 次 CTA：`Upload your manifest`
  - 低门槛入口：`View sample report`
- 增加三条首屏痛点说明：
  - Avoid rejection surprises
  - Reduce review friction
  - Keep code private
- 将人工入口从泛化 `Human review` 改成 `Already rejected?`，更直接面向 Chrome Web Store 被拒或准备重新提交的用户，但仍不接支付、不做审核通过保证。
- 验证结果：
  - `npm run typecheck` 通过
  - `npm run build` 通过
  - 本地 Chrome/Playwright 桌面和移动视口检查无明显重叠
  - 从 `/from/reddit-review-delay` 点击 sample 后正确记录 `/event/reddit-review-delay/sample-high`

## 2026-05-23

### Cloudflare 事件埋点修复

- 发现问题：原来的 `trackUsageEvent` 只使用 `history.pushState` 改变地址栏，Cloudflare Web Analytics 不会因此发送新的 RUM beacon。
- 修复方式：关键行为发生时加载一个不可见 iframe 到 `/event/<source>/<event>`，让 Cloudflare 按真实页面加载记录事件路径。
- 保持限制：不新增后端、不新增数据库、不接第三方分析 SDK、不上传用户文件。
- 验证结果：
  - `npm run typecheck` 通过
  - `npm run build` 通过
  - 本地预览点击 `Try sample manifest` 后，请求了 `/event/local-frame-check/sample-high`
  - 线上部署到 `https://54ae04f2.chrome-extension-preflight-checker.pages.dev`
  - 线上正式域名点击 `Try sample manifest` 后，网络请求中出现 `/event/codex-event-fix/sample-high`，并看到第二次 Cloudflare RUM POST
- 需要上线后观察：
  - `/event/<source>/sample-high`
  - `/event/<source>/choose-file-click`
  - `/event/<source>/upload-file`
  - `/event/<source>/report-generated`
  - `/event/<source>/export-markdown`
  - `/event/<source>/manual-review-click`

## 维护说明

本项目为文档可执行说明优先：  
如发现规则边界变化、Chrome 文档更新或发布政策调整，请优先先更新 `docs/rule-reference.md`，再补齐 `README.md` 的约束声明与 `validation-plan` 的指标。
