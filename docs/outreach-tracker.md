# Outreach Tracker

Use this file during the 7-day validation run. Fill it once per day after Cloudflare Web Analytics has had time to update.

## Posting Log

| Date | Time zone | Channel | Post URL | Tracking link | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-05-19 | BJT | Reddit | https://www.reddit.com/r/chrome_extensions/comments/1thhw5o/i_built_a_localonly_chrome_extension_preflight/ | `/from/reddit` | Posted | First public test published in `r/chrome_extensions`; track visits and report actions in Cloudflare Web Analytics |
| 2026-05-19 | BJT | NoSignupTools | https://nosignuptools.com/submit | `/from/nosignuptools` | Submitted for review | Submitted with tool icon and screenshot; directory shows submission received and review pending |
| 2026-05-19 | BJT | Reddit comment | https://www.reddit.com/r/chrome_extensions/comments/1s69b2s/minimizing_permissions_for_chrome_extension/ | `/from/reddit-permissions` | Posted | Replied to a permissions/host_permissions question with practical guidance first, then one relevant local-only checker link |
| 2026-05-20 | BJT | Hacker News |  | `/from/hackernews` | Planned | Show HN only if available to reply |
| 2026-05-20 | BJT | X |  | `/from/x` | Planned | Short launch note |
| 2026-05-21 | BJT | Public fallback |  |  | Planned | Use strongest logged-in channel if Reddit is blocked |
| 2026-05-22 | BJT | Indie Hackers |  | `/from/indiehackers` | Planned | Founder validation angle |
| 2026-05-23 | BJT | V2EX/Juejin |  | `/from/v2ex` or `/from/juejin` | Planned | Chinese developer feedback |
| 2026-05-24 | BJT | Best channel follow-up |  |  | Planned | Share early learning |
| 2026-05-25 | BJT | Review |  |  | Planned | Decide continue/pause/interview |

## Channel Readiness

| Date checked | Channel | Status | Blocker / next action |
|---|---|---|---|
| 2026-05-19 | WeChat/private | Not used | User has no private channel; skip this path |
| 2026-05-19 | Hacker News | Login required | User must log in before `Show HN` submission |
| 2026-05-19 | X | Verification required | X asks for account username verification before posting |
| 2026-05-19 | Indie Hackers | Login required | Browser redirects to sign-in page |
| 2026-05-19 | V2EX | Login/CAPTCHA required | User must log in and solve CAPTCHA/invite flow |
| 2026-05-19 | Reddit | Posted | Published in `r/chrome_extensions`; monitor `/from/reddit` and `/event/reddit/*` paths |
| 2026-05-19 | Reddit permissions thread | Posted | Comment posted in a relevant permissions discussion; monitor `/from/reddit-permissions` and avoid reposting in the same thread |
| 2026-05-19 | NoSignupTools | Submitted for review | Directory submission completed; monitor `/from/nosignuptools` and wait for approval or rejection |

## Daily Funnel

| Date | Channel | Visits | Uploads | Reports generated | Exports | Manual review clicks | Real samples | Useful feedback | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-05-19 | Reddit | 3 | 0 | 0 | 0 | 0 | 0 | 0 | Cloudflare Web Analytics, Last 24 hours GMT+8, bots excluded: `/from/reddit` = 3 page views; no `/event/reddit/*` paths visible |
| 2026-05-19 | Reddit permissions comment | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Track `/from/reddit-permissions`; no matching path visible in the 2026-05-20 01:10 BJT Cloudflare snapshot |
| 2026-05-19 | NoSignupTools | 1 | 0 | 0 | 0 | 0 | 0 | 0 | Cloudflare Web Analytics, Last 24 hours GMT+8, bots excluded: `/from/nosignuptools` = 1 page view; pending directory review; no event paths visible |
| 2026-05-20 | Hacker News |  |  |  |  |  |  |  |  |
| 2026-05-20 | X |  |  |  |  |  |  |  |  |
| 2026-05-21 | Public fallback |  |  |  |  |  |  |  |  |
| 2026-05-22 | Indie Hackers |  |  |  |  |  |  |  |  |
| 2026-05-23 | Chinese developer channel |  |  |  |  |  |  |  |  |
| 2026-05-24 | Follow-up |  |  |  |  |  |  |  |  |
| 2026-05-25 | Total review |  |  |  |  |  |  |  |  |

## Analytics Check Log

| Date checked | Source | Window | Site | Page views | Visits | Referrers | Paths | Countries | Devices | Event paths | Notes |
|---|---|---|---|---:|---:|---|---|---|---|---|---|
| 2026-05-20 01:10 BJT | Cloudflare Web Analytics | Last 24 hours, GMT+8, exclude bots = Yes | chrome-extension-preflight-checker.pages.dev | 11 | 11 | None/direct: 8; com.reddit.frontpage: 3 | `/`: 7; `/from/reddit`: 3; `/from/nosignuptools`: 1 | United States: 4; India: 2; Netherlands: 2; Australia: 1; Ireland: 1; Singapore: 1 | Desktop: 7; Mobile: 4 | No `/event/*` paths visible | Very early sample. Treat uploads/reports/exports/manual-review clicks as 0 visible in Cloudflare for this window, not as proof that nobody will use the tool. |

## Useful Feedback Log

| Date | Channel | Feedback summary | User type | Action |
|---|---|---|---|---|
|  |  |  | Extension developer / agency / founder / other |  |

## Manual Review Inquiry Log

| Date | Source | Inquiry type | Email/contact note | Action |
|---|---|---|---|---|
|  |  | MV3 / permissions / CSP / remote code / rejection fix |  |  |
