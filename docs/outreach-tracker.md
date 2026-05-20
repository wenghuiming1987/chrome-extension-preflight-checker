# Outreach Tracker

Use this file during the 7-day validation run. Fill it once per day after Cloudflare Web Analytics has had time to update.

## Posting Log

| Date | Time zone | Channel | Post URL | Tracking link | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-05-19 | BJT | Reddit | https://www.reddit.com/r/chrome_extensions/comments/1thhw5o/i_built_a_localonly_chrome_extension_preflight/ | `/from/reddit` | Posted | First public test published in `r/chrome_extensions`; track visits and report actions in Cloudflare Web Analytics |
| 2026-05-19 | BJT | NoSignupTools | https://nosignuptools.com/submit | `/from/nosignuptools` | Submitted for review | Submitted with tool icon and screenshot; directory shows submission received and review pending |
| 2026-05-19 | BJT | Reddit comment | https://www.reddit.com/r/chrome_extensions/comments/1s69b2s/minimizing_permissions_for_chrome_extension/ | `/from/reddit-permissions` | Posted | Replied to a permissions/host_permissions question with practical guidance first, then one relevant local-only checker link |
| 2026-05-20 | BJT | Hacker News |  | `/from/hackernews` | Ready - awaiting final confirmation | Local Chrome can open the HN submit page; post only the Show HN link/title, no generated first comment |
| 2026-05-20 | BJT | Reddit problem reply | https://www.reddit.com/r/chrome_extensions/comments/1swwowk/broad_host_permissions_how_long_did_your_indepth/ | `/from/reddit-host-permissions` | Ready - awaiting final confirmation | High-relevance host_permissions review-delay question; local Reddit session is logged in as `Willing_Cantaloupe54` |
| 2026-05-20 | BJT | Tool Commons | https://toolcommons.org/ | `/from/toolcommons` | Blocked - license needed | Strong local-first directory fit, but it requires open source under an OSI-approved license and the repo currently has no license file |
| 2026-05-20 | BJT | X |  | `/from/x` | Blocked - login required | Local Chrome is not logged in to X |
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
| 2026-05-20 | Hacker News | Ready | Local Chrome opens `https://news.ycombinator.com/submit`; final public submission still needs user confirmation |
| 2026-05-20 | Reddit | Ready | Local Chrome is logged in as `Willing_Cantaloupe54`; final public comment still needs user confirmation |
| 2026-05-20 | X | Login required | Local Chrome shows X signup/login page, so skip until user logs in |
| 2026-05-20 | Indie Hackers | Login required | Local Chrome redirects to `https://www.indiehackers.com/sign-in`, so skip until user logs in |
| 2026-05-20 | V2EX | Activation required | Local Chrome is logged in as `whm5294186`, but account requires invite/token activation before posting |
| 2026-05-20 | Tool Commons | License blocked | GitHub CLI is logged in, but Tool Commons requires an OSI-approved license and this repo has no license metadata |

## Prepared Drafts

### 2026-05-20 Hacker News

Title:

```text
Show HN: Local preflight checker for Chrome extensions
```

URL:

```text
https://chrome-extension-preflight-checker.pages.dev/from/hackernews
```

Note: HN's guidelines say Show HN is for things users can try, and the tool is usable without login or upload. Do not post a generated first comment; answer any HN comments manually and conversationally.

### 2026-05-20 Reddit Host Permissions Reply

Thread:

```text
https://www.reddit.com/r/chrome_extensions/comments/1swwowk/broad_host_permissions_how_long_did_your_indepth/
```

Draft:

```text
Review time varies a lot, but the part you can control is making the broad host permission easy to justify.

For `<all_urls>`, I would check three things before resubmitting or waiting too long:

1. Can any part move to `activeTab`, optional host permissions, or narrower user-configured host patterns?
2. If user-defined websites are core to the product, explain exactly when the user adds a site, what runs on that site, and what data leaves the page.
3. Keep `content_scripts.matches`, `all_frames`, `run_at`, and CSP as narrow as the product allows. Broad hosts plus `all_frames` or early injection can look much riskier than broad hosts alone.

Also scan the actual uploaded zip, not only the source repo. It is easy for a build artifact to keep old permissions, remote script strings, or CSP values after you think you removed them.

I built a small local-only checker for this kind of pre-submission pass. It reads the manifest/zip in your browser and flags broad permissions, host_permissions, content_scripts, CSP, and remote-code patterns. No upload, login, or API:
https://chrome-extension-preflight-checker.pages.dev/from/reddit-host-permissions
```

### 2026-05-20 Tool Commons

Tool Commons is a good fit because it explicitly wants open source, local-first, no-login, static-hostable single-purpose tools. The blocker is that this repo is public but currently has no OSI-approved license file. Do not submit until the user approves adding a license, for example MIT.

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
