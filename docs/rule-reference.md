# Rule Reference (v1)

## Scope

This tool performs local static checks on files selected in the browser. It does not upload files, call APIs, scan URLs, run a dynamic sandbox, repair source code, perform antivirus scanning, certify security, or guarantee Chrome Web Store approval.

The output is a static risk prompt: possible MV3 migration issues, possible submission risks, and items that need human confirmation.

## Severity Levels

- **Critical**: strong static signal for a likely submission blocker or major migration risk, such as Manifest V2 or remote executable code.
- **High**: broad access, CSP, dynamic execution, or connectivity pattern that should be reviewed before submission.
- **Medium**: review-worthy behavior that can be legitimate but should be narrowed or justified.
- **Info**: scan coverage or context note.

Overall risk can be Low when no Medium, High, or Critical findings are produced by the current rule set.

## Implemented Rules

| Rule | Severity | Reference |
|---|---|---|
| `manifest_version` missing | High | https://developer.chrome.com/docs/extensions/reference/manifest |
| `manifest_version === 2` | Critical | https://developer.chrome.com/docs/extensions/reference/manifest |
| MV3 manifest uses `background.scripts`, `background.page`, or `persistent` background | High | https://developer.chrome.com/docs/extensions/reference/manifest/background |
| MV3 manifest uses `browser_action` or `page_action` | Medium | https://developer.chrome.com/blog/mv3-actions/ |
| Dangerous permissions: `debugger`, `cookies`, `history`, `nativeMessaging`, `proxy`, `management`, `webRequest`, `webRequestBlocking`, `tabs`, `downloads`, `scripting`, `bookmarks`, `topSites`, `clipboardRead`, `clipboardWrite` | Medium or High | https://developer.chrome.com/docs/extensions/reference/permissions-list |
| Broad host permissions: `<all_urls>`, `*://*/*`, `http://*/*`, `https://*/*`, `file://*/*` | High | https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions |
| Broad `content_scripts.matches` | High | https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts |
| `content_scripts.all_frames === true` | Medium | https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts |
| `content_scripts.run_at === "document_start"` | Medium | https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts |
| `content_security_policy` contains `unsafe-eval` | High | https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy |
| CSP `script-src` or `worker-src` allows remote `http://` or `https://` source | High | https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy |
| HTML contains `<script src="https://...">` | Critical | https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code |
| JavaScript contains `importScripts("https://...")` | Critical | https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code |
| JavaScript contains `eval(`, `new Function(`, `setTimeout("...")`, or `setInterval("...")` | High | https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy |
| `web_accessible_resources` exposes wildcard resources or broad matches | Medium | https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources |
| `externally_connectable` uses broad matches or `ids: ["*"]` | High | https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable |
| Only `manifest.json` is uploaded, so source-file remote-code checks are limited | Info | Local scan coverage note |

## File Limits

- Zip max size: 20MB
- Max files in zip: 1000
- Single text file scan max: 2MB
- Total text scan max: 10MB
- Text extensions scanned: `.js`, `.mjs`, `.html`, `.htm`, `.css`, `.json`

If a limit is exceeded, the tool still attempts to parse `manifest.json` and reports that source scanning is incomplete.
