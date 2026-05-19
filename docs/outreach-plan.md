# External Distribution Plan

## Goal

Run a 7-day external validation push for Chrome Extension Preflight Checker without buying links, buying a domain, spamming communities, or adding more product scope.

Primary goal: find real Chrome extension developers who will upload a manifest or zip, generate a report, and tell us whether the result is useful before Chrome Web Store submission.

## Live Links

Main site:

`https://chrome-extension-preflight-checker.pages.dev/`

Use source-specific paths when posting:

| Channel | Link | Primary signal |
|---|---|---|
| Hacker News | `https://chrome-extension-preflight-checker.pages.dev/from/hackernews` | Technical feedback and real samples |
| Reddit | `https://chrome-extension-preflight-checker.pages.dev/from/reddit` | Extension developer pain points |
| Indie Hackers | `https://chrome-extension-preflight-checker.pages.dev/from/indiehackers` | Founder/dev-tool demand |
| X | `https://chrome-extension-preflight-checker.pages.dev/from/x` | Fast reach and replies |
| LinkedIn | `https://chrome-extension-preflight-checker.pages.dev/from/linkedin` | Professional extension/team users |
| V2EX | `https://chrome-extension-preflight-checker.pages.dev/from/v2ex` | Chinese developer feedback |
| Juejin | `https://chrome-extension-preflight-checker.pages.dev/from/juejin` | Chinese frontend/extension developers |
| Zhihu | `https://chrome-extension-preflight-checker.pages.dev/from/zhihu` | Longer Chinese explanation and comments |
| WeChat/private | `https://chrome-extension-preflight-checker.pages.dev/from/wechat` | Not used unless a private channel becomes available |
| GitHub profile/README | `https://chrome-extension-preflight-checker.pages.dev/from/github` | Passive discovery |

## Posting Principles

- Ask for feedback and real samples; do not pitch it as a finished security product.
- Say clearly: local static checks, no upload, no login, no API, no approval guarantee.
- Do not say "safe", "virus", "malware detection", or "guaranteed approval".
- Do not post the same text to many places on the same day.
- Do not ask for upvotes, comments, bookmarks, or artificial engagement.
- Do not buy directory links or submit to low-quality listing sites during validation.
- Stay available for 2 hours after each high-signal post to answer comments.

## 7-Day Schedule

Use Beijing time for logging. Prefer posting English communities during US morning or early afternoon.

| Day | Date | Action | Channel link | Success check |
|---|---|---|---|---|
| Day 1 | 2026-05-19 | Public launch via Reddit only if subreddit rules allow it. If not, use relevant comments instead of a standalone post. | `/from/reddit` | No removal; at least 1 useful thread reply |
| Day 2 | 2026-05-20 | Submit Show HN after login. Also post one X update after account verification. | `/from/hackernews`, `/from/x` | HN comments or at least 5 report generations |
| Day 3 | 2026-05-21 | If Reddit Day 1 was blocked, try a second public channel with login ready. Otherwise answer comments and collect feedback. | strongest available public channel | At least 2 reports generated |
| Day 4 | 2026-05-22 | Indie Hackers launch/story post. Ask specifically for rejected extension cases. | `/from/indiehackers` | At least 1 real founder/developer reply |
| Day 5 | 2026-05-23 | Chinese developer post: V2EX or Juejin, not both at the same hour. | `/from/v2ex` or `/from/juejin` | At least 2 Chinese feedback replies |
| Day 6 | 2026-05-24 | Follow-up post with early learning: common MV3/CSP/permission issues found. | strongest channel so far | Export rate improves or more samples arrive |
| Day 7 | 2026-05-25 | Stop and review metrics. Do not add features until the numbers are clear. | Cloudflare Web Analytics | Decide continue / pause / interview |

## Channel Notes

### Hacker News

Use `Show HN` only because this is a working tool people can try without signup. Keep the title plain, do not use hype, and do not ask anyone to upvote.

Recommended title:

`Show HN: Local preflight checker for Chrome extensions`

### Reddit

Before posting, open the target subreddit rules. If self-promotion is disallowed, do not post a standalone link. Instead, answer relevant questions and mention the tool only when it directly helps.

Safer Reddit angle:

`I built a local-only Chrome extension preflight checker. Looking for feedback from extension developers before I expand it.`

### Indie Hackers

Use a founder validation angle, not a security-product angle:

`I built a free local-only Chrome extension preflight checker to test whether extension developers need a pre-submission checklist.`

### Chinese Channels

Use a practical developer angle:

`做了一个本地版 Chrome 扩展发布前预检工具，想找真实扩展样本验证。`

### Private Channels

Skip private channels for this validation unless the user later provides specific groups or contacts. Do not assume warm/private distribution exists.

## Daily Measurement

In Cloudflare Web Analytics, look for:

- `/from/<channel>` visits
- `/event/<channel>/upload-file`
- `/event/<channel>/report-generated`
- `/event/<channel>/export-markdown`
- `/event/<channel>/export-json`
- `/event/<channel>/manual-review-click`

Calculate:

- Upload conversion = upload-file / from-channel visits
- Report generation rate = report-generated / upload-file
- Export rate = export-markdown + export-json / report-generated
- Manual review intent = manual-review-click plus actual emails

## Stop / Continue Decision

Continue only if the 7-day plan reaches the existing validation thresholds:

- Visitor to upload conversion rate >= 20%
- Successful report generation rate after upload >= 70%
- Markdown or JSON export rate >= 10%
- At least 10 real extension samples
- At least 5 users say the report is useful
- At least 3 manual review / rejection-fix inquiries

If it misses these thresholds, stop product expansion. Interview users first, especially people who generated a report but did not export or contact for manual review.

## References

- Hacker News Show HN guidelines: `https://news.ycombinator.com/showhn.html`
- Hacker News general guidelines: `https://news.ycombinator.com/newsguidelines.html`
- Reddit spam and self-promotion guidance: `https://support.reddithelp.com/hc/en-us/articles/28012014962580-How-do-I-keep-spam-out-of-my-community`
