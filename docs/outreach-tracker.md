# Outreach Tracker

Use this file during the 7-day validation run. Fill it once per day after Cloudflare Web Analytics has had time to update.

## Posting Log

| Date | Time zone | Channel | Post URL | Tracking link | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-05-19 | BJT | Reddit | https://www.reddit.com/r/chrome_extensions/comments/1thhw5o/i_built_a_localonly_chrome_extension_preflight/ | `/from/reddit` | Posted | First public test published in `r/chrome_extensions`; track visits and report actions in Cloudflare Web Analytics |
| 2026-05-19 | BJT | NoSignupTools | https://nosignuptools.com/submit | `/from/nosignuptools` | Submitted for review | Submitted with tool icon and screenshot; directory shows submission received and review pending |
| 2026-05-19 | BJT | Reddit comment | https://www.reddit.com/r/chrome_extensions/comments/1s69b2s/minimizing_permissions_for_chrome_extension/ | `/from/reddit-permissions` | Posted | Replied to a permissions/host_permissions question with practical guidance first, then one relevant local-only checker link |
| 2026-05-20 | BJT | Hacker News | https://news.ycombinator.com/showlim | `/from/hackernews` | Blocked by HN restriction | Show HN submit redirected to the temporary Show HN restriction page; no public post was created |
| 2026-05-20 | BJT | Reddit problem reply | https://old.reddit.com/r/chrome_extensions/comments/1swwowk/broad_host_permissions_how_long_did_your_indepth/omt0047/ | `/from/reddit-host-permissions` | Posted | Replied to a high-relevance host_permissions review-delay question with practical review-prep guidance first, then one relevant checker link |
| 2026-05-20 | BJT | Reddit problem reply | https://old.reddit.com/r/chrome_extensions/comments/1nhusf8/chrome_web_store_rejected_my_extension_update_for/omt449z/ | `/from/reddit-posthog` | Posted | Replied to a remote-code/PostHog rejection question with package-scan guidance first, then one relevant checker link |
| 2026-05-20 | BJT | DevPages directory | https://devpages.io/submit-a-tool | `/from/devpages` | Submitted for review | Submitted with `whm5294186@gmail.com`; page confirmed: "Thank You! Your tool submission has been received." |
| 2026-05-20 | BJT | Tool Commons | https://toolcommons.org/ | `/from/toolcommons` | Blocked - license needed | Strong local-first directory fit, but it requires open source under an OSI-approved license and the repo currently has no license file |
| 2026-05-20 | BJT | X |  | `/from/x` | Blocked - login required | Local Chrome is not logged in to X |
| 2026-05-22 | BJT | Reddit manual reply | https://www.reddit.com/r/chrome_extensions/comments/1t906l6/chrome_web_store_review_taking_10_days_after/ | `/from/reddit-review-delay` | Manually posted by user | User reported the prepared review-delay reply was posted; public comment permalink still needs verification |
| 2026-05-22 | BJT | Reddit manual reply | https://www.reddit.com/r/chrome_extensions/comments/1suf4kl/chrome_review_times_are_brutal/ | `/from/reddit-review-times` | Manually posted by user | User reported the prepared review-times reply was posted; public comment permalink still needs verification |
| 2026-05-23 | BJT | FreeNoSignup directory | https://freenosignup.com/submit/ | `/from/freenosignup` | Submitted for review | Submitted using `whm5294186@gmail.com`; Google Form confirmation showed "您的回复已记录。" |
| 2026-05-23 | BJT | App Stack Builder directory | https://appstackbuilder.com/submit-tool | `/from/appstackbuilder` | Submitted for review | Submitted using `whm5294186@gmail.com`; page confirmed: "Tool submitted successfully! We'll review it and add it to our catalog." |
| 2026-05-23 | BJT | nologin.tools directory | https://nologin.tools/submit/ | `/from/nologin-tools` | Submitted for review | Submitted using `whm5294186@gmail.com`; success page confirmed submission received and created pending listing preview at `https://nologin.tools/tool/chrome-extension-preflight-checker-pages-dev-from-nologin-tools` |
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
| 2026-05-20 | Hacker News | Blocked | Local submit was attempted after user confirmation, but HN redirected to `https://news.ycombinator.com/showlim`; do not retry today |
| 2026-05-20 | Reddit | Posted | Local Chrome is logged in as `Willing_Cantaloupe54`; host_permissions reply published |
| 2026-05-20 | Reddit PostHog thread | Posted | Public comment posted in a Chrome Web Store remote-code rejection thread; monitor `/from/reddit-posthog` |
| 2026-05-20 | DevPages | Submitted for review | Public submit form showed no visible login, payment, badge, or backlink requirement; contact email was submitted after user confirmation |
| 2026-05-20 | X | Login required | Local Chrome shows X signup/login page, so skip until user logs in |
| 2026-05-20 | Indie Hackers | Login required | Local Chrome redirects to `https://www.indiehackers.com/sign-in`, so skip until user logs in |
| 2026-05-20 | V2EX | Activation required | Local Chrome is logged in as `whm5294186`, but account requires invite/token activation before posting |
| 2026-05-20 | Tool Commons | License blocked | GitHub CLI is logged in, but Tool Commons requires an OSI-approved license and this repo has no license metadata |
| 2026-05-21 | Keyword-first workflow | Updated | User corrected the process: search pain keywords first, filter recent results, confirm real questions, check site rules, then answer with one relevant link only if allowed |
| 2026-05-21 | Sub-agent search | Partially completed | Three `gpt-5.3-codex-spark` agents returned keyword/recent-question, directory, and compliance results; one community-search agent failed from context-window exhaustion and should be retried later with a shorter prompt |
| 2026-05-22 | Corrected keyword-first sub-agent sweep | Completed | Re-ran separate keyword clusters. Qualified reply opportunities were limited to two recent permissions/review-delay Reddit threads; remote-code, CSP, and package-difference clusters had no safe qualified reply target today. |
| 2026-05-22 | Reddit review-delay reply | Manually posted by user | User reported the prepared reply was posted to the `1t906l6` thread; verify public permalink and monitor `/from/reddit-review-delay`. |
| 2026-05-22 | Reddit review-times reply | Manually posted by user | User reported the prepared reply was posted to the `1suf4kl` thread; verify public permalink and monitor `/from/reddit-review-times`. |
| 2026-05-23 | FreeNoSignup | Submitted for review | Public Google Form accepted the tool submission; monitor `/from/freenosignup` and wait for approval before counting it as a live backlink. |
| 2026-05-23 | App Stack Builder | Submitted for review | Public submit form accepted the tool submission; monitor `/from/appstackbuilder` and wait for catalog approval before counting it as a live backlink. |
| 2026-05-23 | nologin.tools | Submitted for review | Public submit form accepted the tool submission and produced a pending preview page; monitor `/from/nologin-tools` and wait for public approval before counting it as a live backlink. |
| 2026-05-23 | Sub-agent cleanup | Completed | One `gpt-5.3-codex-spark` directory-research agent completed and was closed after its useful candidate list was reviewed. |

## Qualified Reply Opportunities

| Date found | Keyword cluster | URL | Recency evidence | Existing answer status | Answer gap | Recommended tracking link | Priority | Risk | Status |
|---|---|---|---|---|---|---|---|---|---|
| 2026-05-22 | host_permissions / broad permissions / activeTab / review delay | https://www.reddit.com/r/chrome_extensions/comments/1t906l6/chrome_web_store_review_taking_10_days_after/ | About 2 days old in `r/chrome_extensions` | Several experience-based replies, but no structured review-prep checklist | Missing a practical checklist for permission minimization, `activeTab` alternatives, permission justification, and uploaded-zip checks | `/from/reddit-review-delay` | High | Low-medium | Manually posted by user; permalink verification pending |
| 2026-05-22 | host_permissions / all_urls / in-depth review / activeTab | https://www.reddit.com/r/chrome_extensions/comments/1suf4kl/chrome_review_times_are_brutal/ | About 15 hours old in `r/chrome_extensions` | Opinion/experience replies, but no reproducible process | Missing a specific flow for reducing broad permissions and avoiding repeated slow review signals | `/from/reddit-review-times` | High | Medium | Manually posted by user; permalink verification pending |

## Skipped Outreach Candidates

| Date found | URL or source | Reason |
|---|---|---|
| 2026-05-22 | https://www.reddit.com/r/chrome_extensions/comments/1tink3x/i_kept_getting_my_extension_rejected_for_things_i/ | Recent but too broad/experience-oriented; not a precise unanswered technical problem for our link. |
| 2026-05-22 | https://www.reddit.com/r/chrome_extensions/comments/1thl8g8/got_rejected_3_times_over_17_days_for_my_chrome/ | Recent but appears to be another tool/scanner promotion context; replying with our tool link would look like hijacking. |
| 2026-05-22 | https://www.reddit.com/r/chrome_extensions/comments/1tdqegq/i_am_building_chrome_extension_but_stucked/ | Recent but about project direction, not MV3/pre-submission technical risk. |
| 2026-05-22 | https://github.com/openai/codex/issues/21700 | Within 30 days but about official extension availability/offline install, not a Chrome Web Store preflight issue; external tool link would be off-topic. |
| 2026-05-22 | Stack Overflow permissions / CSP / remote-code historical results | Mostly old, closed, already answered, or high self-promotion risk; not counted for today's 7-day reply plan. |
| 2026-05-23 | https://zearches.com/ | Good directory fit, but the form rejected the browser submission as too fast; delayed retry timed out and direct retry was blocked by ModSecurity. Do not count as submitted. |
| 2026-05-23 | https://toolscourt.com/submit | Good directory fit, but the multi-step form did not complete after review-step validation; no success confirmation. Do not count as submitted. |
| 2026-05-23 | https://toolsdirectoryonline.com/submit | Submit path returned 404. |
| 2026-05-23 | https://toolhunt.co/ | No public submission form found on the inspected page. |
| 2026-05-23 | https://showmeyoursite.com/ | Login required before submission. |
| 2026-05-23 | https://indiestack.com/ | Rejected default Pages URL because the directory requires a custom domain. |
| 2026-05-23 | https://10015.io/product-finder/submit | Public first step opened the product form, but the page showed a sign-in/register requirement for submission. Skipped because login is required. |
| 2026-05-23 | ExtensionHub / Extension Bazaar / Chrome-Stats extension directories | Skipped because these are primarily for submitting actual Chrome extensions or Chrome Web Store URLs. This project is a web checker for extension developers, not a Chrome extension listing. |

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

### 2026-05-20 Reddit PostHog Remote-Code Reply

Thread:

```text
https://www.reddit.com/r/chrome_extensions/comments/1nhusf8/chrome_web_store_rejected_my_extension_update_for/
```

Draft:

```text
For this kind of rejection, I would separate two questions:

1. Does the extension load any remote JavaScript at runtime?
2. Does the final uploaded bundle still contain remote script/code-loading patterns even if you think the SDK is bundled?

For MV3, the important thing is to inspect the packaged zip, not only the source code. Search the built JS/HTML for PostHog CDN URLs, dynamic loaders, `importScripts("https://...")`, remote `<script src=...>`, and CSP entries that allow remote script or worker sources. If the official browser-extension setup bundles everything locally and only sends network requests for events, that is much easier to justify than loading code remotely.

I built a small local-only preflight checker for this exact pre-submission check. It reads the manifest or extension zip in your browser and flags remote-code patterns, CSP issues, broad permissions, and MV3 compatibility risks. No upload, login, or API:
https://chrome-extension-preflight-checker.pages.dev/from/reddit-posthog
```

### 2026-05-20 DevPages Directory Submission

Submit page:

```text
https://devpages.io/submit-a-tool
```

Prepared fields:

```text
Tool Name:
Chrome Extension Preflight Checker

Website URL:
https://chrome-extension-preflight-checker.pages.dev/from/devpages

Description:
A free local-only browser tool that checks Chrome extension manifest.json or extension.zip files for Manifest V3 compatibility, broad permissions, host_permissions, content_scripts, CSP, remote-code patterns, and dynamic execution risks. Files stay in the user's browser; no upload, login, backend, or API.

Category:
Security

Pricing Model:
Free

GitHub URL:
https://github.com/wenghuiming1987/chrome-extension-preflight-checker

Email:
Use only after user confirms the contact email for directory submissions.
```

Do not submit until the user confirms using a contact email, because the form requires personal contact information.

Submission result: submitted on 2026-05-20 BJT using `whm5294186@gmail.com`; confirmation page said the tool submission was received and will be reviewed.

## Daily Funnel

| Date | Channel | Visits | Uploads | Reports generated | Exports | Manual review clicks | Real samples | Useful feedback | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-05-19 | Reddit | 3 | 0 | 0 | 0 | 0 | 0 | 0 | Cloudflare Web Analytics, Last 24 hours GMT+8, bots excluded: `/from/reddit` = 3 page views; no `/event/reddit/*` paths visible |
| 2026-05-19 | Reddit permissions comment | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Track `/from/reddit-permissions`; no matching path visible in the 2026-05-20 01:10 BJT Cloudflare snapshot |
| 2026-05-19 | NoSignupTools | 1 | 0 | 0 | 0 | 0 | 0 | 0 | Cloudflare Web Analytics, Last 24 hours GMT+8, bots excluded: `/from/nosignuptools` = 1 page view; pending directory review; no event paths visible |
| 2026-05-20 | Hacker News | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Show HN blocked by HN's temporary restriction page; no public post created |
| 2026-05-20 | Reddit host permissions reply | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Track `/from/reddit-host-permissions`; comment posted at https://old.reddit.com/r/chrome_extensions/comments/1swwowk/broad_host_permissions_how_long_did_your_indepth/omt0047/; no matching path visible in the 2026-05-20 23:42 BJT Cloudflare snapshot |
| 2026-05-20 | Reddit PostHog reply | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Track `/from/reddit-posthog`; comment posted at https://old.reddit.com/r/chrome_extensions/comments/1nhusf8/chrome_web_store_rejected_my_extension_update_for/omt449z/; no matching path visible in the 2026-05-20 23:42 BJT Cloudflare snapshot |
| 2026-05-20 | DevPages | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Track `/from/devpages`; submitted for directory review with confirmed contact email; no matching path visible in the 2026-05-20 23:42 BJT Cloudflare snapshot |
| 2026-05-20 | X |  |  |  |  |  |  |  |  |
| 2026-05-21 | Keyword-first research | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Initial research was too Reddit-heavy. User corrected the process. Re-ran non-Reddit-first sub-agents on 2026-05-22: 7-day non-Reddit real-question results were effectively empty; 30-day fallback found Chromium Extensions threads and weakly related GitHub issues, but no high-confidence non-Reddit answer target. Directory candidates remain FreeNoSignup, Tools Directory Online, Zearches, ToolsCourt. |
| 2026-05-22 | Corrected keyword-first search | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Strict sub-agent sweep by keyword cluster found 2 qualified reply opportunities, both recent Reddit permission/review-delay threads; no qualified remote-code, CSP, or package-difference target today. |
| 2026-05-22 | Reddit review-delay reply |  |  |  |  |  |  |  | User manually posted prepared reply with `/from/reddit-review-delay`; public permalink and Cloudflare events still need verification. |
| 2026-05-22 | Reddit review-times reply |  |  |  |  |  |  |  | User manually posted prepared reply with `/from/reddit-review-times`; public permalink and Cloudflare events still need verification. |
| 2026-05-23 | Directory submissions | 1 | 0 | 0 | 0 | 0 | 0 | 0 | Submitted FreeNoSignup, App Stack Builder, and nologin.tools; Cloudflare shows `/from/nologin-tools` = 1 visit as of 14:05 BJT. These are pending review, not confirmed live backlinks yet. `/event/*` remains unreliable until the SPA tracking issue is fixed. |
| 2026-05-24 | Follow-up |  |  |  |  |  |  |  |  |
| 2026-05-25 | Total review |  |  |  |  |  |  |  |  |

## Analytics Check Log

| Date checked | Source | Window | Site | Page views | Visits | Referrers | Paths | Countries | Devices | Event paths | Notes |
|---|---|---|---|---:|---:|---|---|---|---|---|---|
| 2026-05-20 01:10 BJT | Cloudflare Web Analytics | Last 24 hours, GMT+8, exclude bots = Yes | chrome-extension-preflight-checker.pages.dev | 11 | 11 | None/direct: 8; com.reddit.frontpage: 3 | `/`: 7; `/from/reddit`: 3; `/from/nosignuptools`: 1 | United States: 4; India: 2; Netherlands: 2; Australia: 1; Ireland: 1; Singapore: 1 | Desktop: 7; Mobile: 4 | No `/event/*` paths visible | Very early sample. Treat uploads/reports/exports/manual-review clicks as 0 visible in Cloudflare for this window, not as proof that nobody will use the tool. |
| 2026-05-20 23:42 BJT | Cloudflare Web Analytics | Last 24 hours, GMT+8, exclude bots = Yes | chrome-extension-preflight-checker.pages.dev | 2 | 2 | None/direct: 2 | `/from/reddit`: 1; `/`: 1 | Germany: 2 | Desktop: 2 | No `/event/*` paths visible; no `/from/reddit-host-permissions`, `/from/reddit-posthog`, or `/from/devpages` visible yet | Sliding 24-hour window after day-2 outreach. Newly posted/submitted links may not have visible traffic yet or may still be delayed in analytics. |
| 2026-05-21 15:27 BJT | Cloudflare Web Analytics | Last 24 hours, GMT+8, exclude bots = Yes | chrome-extension-preflight-checker.pages.dev | 1 | 1 | None/direct: 1 | `/`: 1 | Germany: 1 | Desktop: 1 | No `/event/*` paths visible; no `/from/*` outreach paths visible | Current last-24-hour window shows no measurable traffic from day-2 outreach links and no product-use events. |
| 2026-05-21 22:37 BJT | Cloudflare GraphQL Web Analytics | Evening 18:00-22:37 BJT; also checked today and last 24h | chrome-extension-preflight-checker.pages.dev | 0 | 0 | None | None | None | None | No `/event/*`, `choose-file-click`, `sample-high`, `sample-low`, upload, export, or manual-review paths visible | Tonight has no new measurable activity. Seven-day total remains 13 page views/visits: `/` = 8, `/from/reddit` = 4, `/from/nosignuptools` = 1; no product-use events yet. |
| 2026-05-23 14:05 BJT | Cloudflare GraphQL Web Analytics | Launch through 2026-05-23 14:05 BJT; also checked today and last 24h, bots excluded | chrome-extension-preflight-checker.pages.dev | 16 | 16 | None/direct: 13; com.reddit.frontpage: 3 | `/`: 10; `/from/reddit`: 4; `/from/nosignuptools`: 1; `/from/nologin-tools`: 1 | US: 5; IN: 2; NL: 2; CN: 2; DE: 2; AU: 1; IE: 1; SG: 1 | Desktop: 10; Mobile: 6 | No `/event/*` paths visible. A live browser check showed Cloudflare sends a beacon on initial page load, but changing the SPA path to `/event/...` with `history.pushState` did not send a second beacon. | Current product-use data is not reliable until event tracking is changed to a real beacon request or reload-backed event path. Traffic is still too low to validate demand: last 24h = 3 visits, today BJT = 3 visits, and only `/from/nologin-tools` appeared from the May 23 directory submissions. |

## Useful Feedback Log

| Date | Channel | Feedback summary | User type | Action |
|---|---|---|---|---|
|  |  |  | Extension developer / agency / founder / other |  |

## Manual Review Inquiry Log

| Date | Source | Inquiry type | Email/contact note | Action |
|---|---|---|---|---|
|  |  | MV3 / permissions / CSP / remote code / rejection fix |  |  |
