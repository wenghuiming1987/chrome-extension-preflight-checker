# Chrome Extension Preflight Checker

## 项目简介

Chrome Extension Preflight Checker 是一个纯前端、纯本地运行的扩展体检工具，用于在发布前做快速静态合规与打包健康检查。它面向第一版设计，目标是给审查流程提供一份可复用、可共享的本地检查清单和结果摘要，不替代 Chrome Web Store 的审核。

本项目默认只处理本地文件与本地规则，不接入任何后端、数据库、账号体系或第三方在线服务。  

## 关键约束（本版本）

- 无后端服务
- 无数据库
- 无账号登录
- 无任何外部 API 调用（含 VirusTotal/OpenAI/Google API）
- 无文件上传到远端（仅本地读取）
- 无病毒扫描与安全认证服务
- 不提供 Chrome Web Store 上架担保
- 不做 URL 扫描
- 不启用动态沙箱（sandbox）
- 不做自动源码修复

## 本地运行

### 前置条件

- Node.js 20+ 与 npm
- 已安装 Chrome / Chromium 浏览器（用于手动验证扩展加载）

### 启动步骤

```bash
npm install
npm run dev
```

开发服务器启动后在浏览器打开终端输出的地址（通常是 `http://localhost:5173`）。

### 常用命令

```bash
npm run dev      # 本地运行（便于迭代）
npm run build    # 类型检查 + 打包
npm run preview  # 预览打包后的产物
npm run typecheck # 仅类型检查
```

## 构建产物

项目使用 Vite 打包，默认输出到 `dist/`。  
构建成功后，静态文件可直接作为任意静态托管站点发布。

## Cloudflare Pages 部署

1. 在 Cloudflare Pages 创建新项目。
2. 连接本仓库分支（建议 `main`）。
3. 设置构建配置：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
4. 保持默认 Node 版本（或按仓库兼容版本设置）。
5. 触发首次部署并在部署完成后打开 `https://<pages-url>` 验证页面是否可访问。

> 说明：本项目为前端静态页，部署时无需任何环境变量。

## 验证期监控

上线后建议在 Cloudflare Pages 的 `Metrics` 页面开启 Web Analytics。Cloudflare 会在下一次部署时自动注入统计脚本，用来查看访问量、来源页面和路径表现。

本项目不在代码里接入第三方分析 SDK，也不上传用户文件。为了在 Cloudflare Web Analytics 中看验证漏斗，页面会在关键动作发生时写入虚拟路径：

- `/from/<channel>`：外链渠道入口，例如 `/from/reddit`、`/from/x`、`/from/v2ex`
- `/event/<channel>/choose-file-click`：点击上传/选择文件入口
- `/event/<channel>/sample-high`：打开高风险样例报告
- `/event/<channel>/sample-low`：打开低风险样例报告
- `/event/<channel>/upload-file`：用户选择或拖入文件
- `/event/<channel>/report-generated`：报告生成成功
- `/event/<channel>/analysis-failed`：分析失败
- `/event/<channel>/export-markdown`：导出 Markdown
- `/event/<channel>/export-json`：导出 JSON
- `/event/<channel>/manual-review-click`：点击人工审查邮件入口

Cloudflare Web Analytics 目前不支持 UTM 参数和自定义事件，所以这里使用路径作为轻量替代。`public/_redirects` 会把这些路径都回退到 `index.html`，适合 Cloudflare Pages 静态部署。

## GitHub Pages 部署

### 推荐：用 GitHub Actions 自动部署

- 构建命令：`npm run build`
- 打包目录：`dist`
- 将 `dist` 同步到 `gh-pages` 分支（或仓库设置里的 Pages 目录）

如果使用 GitHub Pages 的仓库子路径（例如 `/<repo-name>/`），需要在 `vite.config.ts` 中把 `base` 改为对应子路径后再构建。当前默认配置优先适配 Cloudflare Pages 根路径部署。

### 快速手动部署

```bash
npm run build
```

然后把 `dist/` 下内容上传到 GitHub Pages 可访问目录（例如 `gh-pages` 分支根目录）。

## 开发边界提示

本项目的“预检”定位是**检查与提示**，不是“修复”。  
后续如果要做自动修复、远端提交、云端分析或扩展商店认证协助，建议单独立项。
