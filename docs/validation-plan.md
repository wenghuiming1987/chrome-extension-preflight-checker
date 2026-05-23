# Validation Plan (7-Day Pilot)

## Goal

Validate whether a free, local-only Chrome Extension Preflight Checker has real demand before expanding features or buying a domain.

This pilot is about market signal, not product completeness. The page should remain a static frontend tool with no backend, no database, no login, no API, no file upload, and no security certification claim.

## 7-Day Metrics

Track these metrics for 7 calendar days after sharing the free test page:

| Metric | Success threshold |
|---|---:|
| Visitor to upload conversion rate | >= 20% |
| Successful report generation rate after upload | >= 70% |
| Markdown or JSON report export rate | >= 10% |
| Real extension samples tested | >= 10 |
| Users who say the report is useful | >= 5 |
| Manual review / rejection-fix inquiries | >= 3 |

Use these thresholds only after there is enough traffic to read the funnel. With fewer than about 100 visits, treat upload/export rates as directional only.

## Leading Signals

For the next 3 days, first separate exposure problems from product-conversion problems.

Layer 1: exposure and interest signals:

| Metric | Useful signal |
|---|---:|
| 7-day site visits | >= 150 |
| Sample manifest / sample report clicks | >= 25% of visits |
| Relevant Reddit / forum replies with positive engagement | >= 20 combined upvotes or useful replies |
| At least one outreach channel sending measurable `/from/<channel>` visits | Yes |

Layer 2: product and service validation signals:

| Metric | Useful signal |
|---|---:|
| Real file uploads | >= 10 |
| Report generation after upload | >= 70% |
| Markdown or JSON export after report | >= 10% |
| Manual review clicks or emails | >= 3 |
| Specific useful feedback, not just "cool tool" | >= 3 |

If Layer 1 fails, fix positioning and channels before adding features. If Layer 1 passes but Layer 2 fails, inspect the landing page, upload trust barrier, and whether the human review service is the real product.

## Daily Log Template

Use one row per day:

| Date | Visits | Uploads | Reports generated | Exports | Real samples | Useful feedback count | Manual review inquiries | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Day 1 |  |  |  |  |  |  |  |  |
| Day 2 |  |  |  |  |  |  |  |  |
| Day 3 |  |  |  |  |  |  |  |  |
| Day 4 |  |  |  |  |  |  |  |  |
| Day 5 |  |  |  |  |  |  |  |  |
| Day 6 |  |  |  |  |  |  |  |  |
| Day 7 |  |  |  |  |  |  |  |  |

## Monitoring Setup

Use Cloudflare Pages Web Analytics for the public validation run:

1. Deploy the static site to Cloudflare Pages.
2. Open the Pages project in Cloudflare.
3. Go to `Metrics`.
4. Enable Web Analytics.
5. Redeploy the Pages project so Cloudflare can inject the analytics snippet.

Cloudflare Web Analytics currently does not support UTM parameters or custom events. For this MVP, use path-based tracking:

- Share `/from/reddit` for Reddit.
- Share `/from/x` for X.
- Share `/from/linkedin` for LinkedIn.
- Share `/from/v2ex` for V2EX or similar Chinese developer communities.
- Share `/from/wechat` for WeChat/private groups.

The app records key actions by loading local virtual paths in a hidden frame:

- `/event/<channel>/choose-file-click`
- `/event/<channel>/sample-high`
- `/event/<channel>/sample-low`
- `/event/<channel>/upload-file`
- `/event/<channel>/report-generated`
- `/event/<channel>/analysis-failed`
- `/event/<channel>/export-markdown`
- `/event/<channel>/export-json`
- `/event/<channel>/manual-review-click`

Use these path counts to estimate the 7-day funnel. Sample-report events are useful for diagnosing first-use interest, but they do not replace the core upload/report/export targets. Manual review demand should still be confirmed by real email inquiries, not path counts alone. The hidden-frame event path is only a local static page load for Cloudflare Web Analytics; it does not upload selected files.

## Suggested Channels

- Chrome extension developer communities
- Indie hacker / micro-SaaS communities
- Web extension developer forums
- Reddit communities related to browser extensions and web development
- X / LinkedIn posts aimed at extension developers
- Chinese developer communities where Chrome extension builders discuss Web Store rejection

Target up to 3 public outreach actions per day, but only after checking the community or directory rules. A valid action can be a relevant problem reply, a compliant standalone post, or a quality free directory/resource submission. If fewer than 3 good opportunities exist, publish fewer rather than forcing weak links.

Every reply should solve the user's problem first, then include one most relevant link only when it naturally helps. Do not spam many channels at once; stagger posts so feedback can be attributed.

The concrete posting schedule, tracking links, and channel-specific copy are in:

- `docs/outreach-plan.md`
- `docs/outreach-tracker.md`
- `docs/community-posts.md`

## Stop Rule

If the 7-day pilot does not meet the thresholds above:

- Do not expand the feature set.
- Do not buy a domain.
- Do not add backend analysis, payment, API integrations, PDF export, virus scanning, or automatic fixes.
- First interview users who uploaded files but did not export or ask for help.

Only continue if the upload, report, export, and manual-review signals show real demand.
