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
- 添加轻量反馈记录模板，用于 7 天验证期统计上传、导出、人工审查咨询
- 补齐 `docs/changelog.md` 的版本迭代记录模板
- 为 Cloudflare Pages 与 GitHub Pages 提供统一的截图化验收清单
- 7 天验收结束后基于真实结果回写阈值（必要时微调）

## 维护说明

本项目为文档可执行说明优先：  
如发现规则边界变化、Chrome 文档更新或发布政策调整，请优先先更新 `docs/rule-reference.md`，再补齐 `README.md` 的约束声明与 `validation-plan` 的指标。
