import {
  BROAD_HOST_PATTERNS,
  CHINESE_DISCLAIMER,
  CHROME_DOCS,
  DANGEROUS_PERMISSIONS,
  DISCLAIMER,
} from "./constants";
import type {
  AnalysisInput,
  ChromeManifest,
  Finding,
  OverallRisk,
  Report,
  Severity,
  TextFile,
} from "./types";

const severityRank: Record<Severity, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Info: 1,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function stringifyEvidence(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function manifestVersion(manifest: ChromeManifest): number | "missing" | "unknown" {
  if (manifest.manifest_version === undefined) return "missing";
  if (typeof manifest.manifest_version === "number") return manifest.manifest_version;
  return "unknown";
}

function extensionName(manifest: ChromeManifest): string {
  return typeof manifest.name === "string" ? manifest.name : "Unknown extension";
}

function extensionVersion(manifest: ChromeManifest): string {
  return typeof manifest.version === "string" ? manifest.version : "Unknown version";
}

function hasBroadPattern(patterns: string[]): string[] {
  return patterns.filter((pattern) => BROAD_HOST_PATTERNS.includes(pattern));
}

function isHostPattern(value: string): boolean {
  return value === "<all_urls>" || /^[*a-z]+:\/\/.+/i.test(value);
}

function collectCspPolicies(manifest: ChromeManifest): string[] {
  const csp = manifest.content_security_policy;
  if (typeof csp === "string") return [csp];
  if (isRecord(csp)) {
    return Object.values(csp).filter((value): value is string => typeof value === "string");
  }
  return [];
}

function cspDirectiveValues(policy: string, directiveName: "script-src" | "worker-src"): string[] {
  return policy
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .flatMap((directive) => {
      const [name, ...values] = directive.split(/\s+/);
      return name === directiveName ? values : [];
    });
}

function hasRemoteCspSource(policy: string, directiveName: "script-src" | "worker-src"): boolean {
  return cspDirectiveValues(policy, directiveName).some((value) => /^https?:\/\//i.test(value));
}

function findRemoteScripts(files: TextFile[]): Array<{ path: string; evidence: string }> {
  const findings: Array<{ path: string; evidence: string }> = [];
  const htmlScriptPattern = /<script\b[^>]*\bsrc\s*=\s*["']https?:\/\/[^"']+["'][^>]*>/gi;
  const importScriptsPattern = /importScripts\s*\(\s*["']https?:\/\/[^"']+["']\s*\)/gi;

  for (const file of files) {
    const matches = [
      ...file.content.matchAll(htmlScriptPattern),
      ...file.content.matchAll(importScriptsPattern),
    ].slice(0, 5);
    for (const match of matches) {
      findings.push({ path: file.path, evidence: match[0] });
    }
  }

  return findings;
}

function findDynamicExecution(files: TextFile[]): Array<{ path: string; evidence: string }> {
  const findings: Array<{ path: string; evidence: string }> = [];
  const patterns = [
    /\beval\s*\(/gi,
    /\bnew\s+Function\s*\(/gi,
    /\bsetTimeout\s*\(\s*["'][\s\S]{0,120}?["']/gi,
    /\bsetInterval\s*\(\s*["'][\s\S]{0,120}?["']/gi,
  ];

  for (const file of files.filter((item) => /\.(m?js|html?)$/i.test(item.path))) {
    const matches = patterns.flatMap((pattern) =>
      [...file.content.matchAll(pattern)].map((match) => match[0]),
    );
    for (const evidence of matches.slice(0, 5)) {
      findings.push({ path: file.path, evidence });
    }
  }

  return findings;
}

function webAccessibleFindings(manifest: ChromeManifest): string[] {
  const value = manifest.web_accessible_resources;
  if (!Array.isArray(value)) return [];

  const evidence: string[] = [];
  for (const entry of value) {
    if (typeof entry === "string" && (entry === "*" || entry === "/*" || entry.includes("*"))) {
      evidence.push(entry);
    }
    if (isRecord(entry)) {
      const resources = asStringArray(entry.resources);
      const matches = asStringArray(entry.matches);
      const broadResources = resources.filter(
        (resource) => resource === "*" || resource === "/*" || resource === "/**/*",
      );
      const broadMatches = hasBroadPattern(matches);
      if (broadResources.length > 0 || broadMatches.length > 0) {
        evidence.push(stringifyEvidence(entry));
      }
    }
  }
  return evidence;
}

function externallyConnectableFindings(manifest: ChromeManifest): string[] {
  const value = manifest.externally_connectable;
  if (!isRecord(value)) return [];
  const matches = asStringArray(value.matches);
  const ids = asStringArray(value.ids);
  const evidence = [...hasBroadPattern(matches)];
  if (ids.includes("*")) evidence.push('"ids": ["*"]');
  return evidence;
}

function createFindingFactory() {
  let count = 0;
  return (finding: Omit<Finding, "id">): Finding => ({
    id: `finding-${String(++count).padStart(3, "0")}`,
    ...finding,
  });
}

function calculateOverallRisk(findings: Finding[]): OverallRisk {
  if (findings.some((finding) => finding.severity === "Critical")) return "Critical";
  if (findings.some((finding) => finding.severity === "High")) return "High";
  if (findings.some((finding) => finding.severity === "Medium")) return "Medium";
  return "Low";
}

function countFindings(findings: Finding[]): Record<Severity, number> {
  return findings.reduce<Record<Severity, number>>(
    (accumulator, finding) => {
      accumulator[finding.severity] += 1;
      return accumulator;
    },
    { Critical: 0, High: 0, Medium: 0, Info: 0 },
  );
}

function checklistFromFindings(findings: Finding[]): string[] {
  const unique = new Map<string, string>();
  for (const finding of findings) {
    unique.set(finding.title, finding.recommendation);
  }
  if (unique.size === 0) {
    return [
      "Keep permissions narrow and document why each requested capability is needed.",
      "Re-run this preflight check before each Chrome Web Store submission.",
    ];
  }
  return Array.from(unique.values());
}

export function analyzeExtension(input: AnalysisInput): Report {
  const { manifest, sourceScan } = input;
  const mv = manifestVersion(manifest);
  const addFinding = createFindingFactory();
  const findings: Finding[] = [];
  const permissions = asStringArray(manifest.permissions);
  const optionalPermissions = asStringArray(manifest.optional_permissions);
  const allPermissions = [...permissions, ...optionalPermissions];
  const hostPermissions = [
    ...asStringArray(manifest.host_permissions),
    ...asStringArray(manifest.optional_host_permissions),
    ...allPermissions.filter(isHostPattern),
  ];

  if (mv === "missing") {
    findings.push(
      addFinding({
        severity: "High",
        category: "Manifest",
        title: "manifest_version is missing",
        explanation:
          "Chrome extensions need a manifest_version value. Missing version information can block review and makes MV3 compatibility unclear.",
        evidence: "manifest_version: missing",
        recommendation: "Add manifest_version: 3 if this package is intended for Manifest V3.",
        referenceUrl: CHROME_DOCS.manifest,
      }),
    );
  } else if (mv === 2) {
    findings.push(
      addFinding({
        severity: "Critical",
        category: "MV3 compatibility",
        title: "Manifest V2 extension detected",
        explanation:
          "Manifest V2 is a major migration risk for Chrome Web Store submission. This is a static compatibility signal, not a security verdict.",
        evidence: "manifest_version: 2",
        recommendation:
          "Migrate the extension to Manifest V3 and replace MV2-only background and action fields.",
        referenceUrl: CHROME_DOCS.manifest,
      }),
    );
  } else if (mv !== 3) {
    findings.push(
      addFinding({
        severity: "High",
        category: "Manifest",
        title: "Unsupported manifest_version value",
        explanation:
          "The current Chrome extension platform expects Manifest V3 for new extensions.",
        evidence: `manifest_version: ${String(mv)}`,
        recommendation: "Confirm the manifest version and update the extension to Manifest V3.",
        referenceUrl: CHROME_DOCS.manifest,
      }),
    );
  }

  const background = isRecord(manifest.background) ? manifest.background : undefined;
  if (mv === 3 && background) {
    const legacyKeys = ["scripts", "page", "persistent"].filter((key) => key in background);
    if (legacyKeys.length > 0) {
      findings.push(
        addFinding({
          severity: "High",
          category: "MV3 compatibility",
          title: "MV2 background fields used in MV3",
          explanation:
            "Manifest V3 background logic should use an extension service worker. scripts, page, and persistent are MV2-era patterns.",
          evidence: stringifyEvidence(
            Object.fromEntries(legacyKeys.map((key) => [key, background[key]])),
          ),
          recommendation:
            "Move background logic to background.service_worker and remove persistent background configuration.",
          referenceUrl: CHROME_DOCS.background,
        }),
      );
    }
  }

  if (mv === 3 && (manifest.browser_action || manifest.page_action)) {
    findings.push(
      addFinding({
        severity: "Medium",
        category: "MV3 compatibility",
        title: "Legacy action field used in MV3",
        explanation:
          "Manifest V3 consolidated browser_action and page_action under the action key.",
        evidence: stringifyEvidence({
          browser_action: manifest.browser_action,
          page_action: manifest.page_action,
        }),
        recommendation: "Replace browser_action or page_action with the MV3 action field.",
        referenceUrl: CHROME_DOCS.mv3Actions,
      }),
    );
  }

  const dangerousPermissions = allPermissions.filter((permission) =>
    DANGEROUS_PERMISSIONS.includes(permission),
  );
  for (const permission of dangerousPermissions) {
    findings.push(
      addFinding({
        severity: permission === "debugger" || permission === "nativeMessaging" ? "High" : "Medium",
        category: "Permissions",
        title: `Review permission: ${permission}`,
        explanation:
          "This permission can expand the extension's access or user trust burden. It may be legitimate, but should be justified before submission.",
        evidence: permission,
        recommendation:
          "Keep this permission only if it is essential, explain it in store copy, and prefer narrower alternatives where possible.",
        referenceUrl: CHROME_DOCS.permissions,
      }),
    );
  }

  for (const broadHost of hasBroadPattern(hostPermissions)) {
    findings.push(
      addFinding({
        severity: "High",
        category: "Host permissions",
        title: `Broad host permission: ${broadHost}`,
        explanation:
          "Broad host access increases review risk and user trust friction because the extension can interact with many sites.",
        evidence: broadHost,
        recommendation:
          "Replace broad host permissions with the smallest set of required origins, or request optional host access only when needed.",
        referenceUrl: CHROME_DOCS.hostPermissions,
      }),
    );
  }

  const contentScripts = Array.isArray(manifest.content_scripts)
    ? manifest.content_scripts.filter(isRecord)
    : [];
  for (const [index, script] of contentScripts.entries()) {
    const matches = asStringArray(script.matches);
    for (const broadMatch of hasBroadPattern(matches)) {
      findings.push(
        addFinding({
          severity: "High",
          category: "Content scripts",
          title: `Broad content_scripts match: ${broadMatch}`,
          explanation:
            "A content script that runs across most or all sites can create privacy and review concerns.",
          evidence: `content_scripts[${index}].matches includes ${broadMatch}`,
          recommendation:
            "Limit content script matches to the domains where the extension's single purpose requires injection.",
          referenceUrl: CHROME_DOCS.contentScripts,
        }),
      );
    }

    if (script.all_frames === true) {
      findings.push(
        addFinding({
          severity: "Medium",
          category: "Content scripts",
          title: "content_scripts all_frames is true",
          explanation:
            "Running in every frame can increase page reach. This may be necessary, but should be intentional.",
          evidence: `content_scripts[${index}].all_frames: true`,
          recommendation:
            "Use all_frames only when iframe coverage is required and document why it is needed.",
          referenceUrl: CHROME_DOCS.contentScripts,
        }),
      );
    }

    if (script.run_at === "document_start") {
      findings.push(
        addFinding({
          severity: "Medium",
          category: "Content scripts",
          title: "content_scripts run_at is document_start",
          explanation:
            "document_start runs before the page is fully loaded. This can be legitimate, but creates a larger timing surface.",
          evidence: `content_scripts[${index}].run_at: document_start`,
          recommendation:
            "Use document_idle or document_end unless early injection is required for the extension's purpose.",
          referenceUrl: CHROME_DOCS.contentScripts,
        }),
      );
    }
  }

  const cspPolicies = collectCspPolicies(manifest);
  for (const policy of cspPolicies) {
    if (policy.includes("'unsafe-eval'") || policy.includes("unsafe-eval")) {
      findings.push(
        addFinding({
          severity: "High",
          category: "CSP",
          title: "CSP includes unsafe-eval",
          explanation:
            "unsafe-eval is a strong static signal for review and runtime risk. MV3 extension pages cannot relax CSP beyond Chrome's minimum policy.",
          evidence: policy,
          recommendation:
            "Remove unsafe-eval and replace string evaluation with bundled, static code paths.",
          referenceUrl: CHROME_DOCS.csp,
        }),
      );
    }

    for (const directive of ["script-src", "worker-src"] as const) {
      if (hasRemoteCspSource(policy, directive)) {
        findings.push(
          addFinding({
            severity: "High",
            category: "CSP",
            title: `CSP ${directive} allows remote sources`,
            explanation:
              "Remote script or worker sources are a static signal for remotely hosted code review risk.",
            evidence: policy,
            recommendation:
              "Bundle executable code inside the extension package and keep script/worker sources local.",
            referenceUrl: CHROME_DOCS.csp,
          }),
        );
      }
    }
  }

  const remoteScripts = findRemoteScripts(sourceScan.scannedFiles);
  for (const remoteScript of remoteScripts) {
    findings.push(
      addFinding({
        severity: "Critical",
        category: "Remote code",
        title: "Remote executable script reference found",
        explanation:
          "MV3 extensions are expected to bundle executable code inside the extension. Remote script references can trigger Chrome Web Store rejection risk.",
        evidence: `${remoteScript.path}: ${remoteScript.evidence}`,
        recommendation:
          "Remove remote executable code references and bundle the required JavaScript inside the extension package.",
        referenceUrl: CHROME_DOCS.remoteHostedCode,
      }),
    );
  }

  const dynamicExecution = findDynamicExecution(sourceScan.scannedFiles);
  for (const dynamic of dynamicExecution) {
    findings.push(
      addFinding({
        severity: "High",
        category: "Dynamic execution",
        title: "Dynamic JavaScript execution pattern found",
        explanation:
          "String-based execution is a static risk signal and can be related to CSP or remotely hosted code concerns.",
        evidence: `${dynamic.path}: ${dynamic.evidence}`,
        recommendation:
          "Replace eval, new Function, and string timers with direct function calls or static bundled code.",
        referenceUrl: CHROME_DOCS.csp,
      }),
    );
  }

  for (const evidence of webAccessibleFindings(manifest)) {
    findings.push(
      addFinding({
        severity: "Medium",
        category: "Web accessible resources",
        title: "web_accessible_resources appears broad",
        explanation:
          "Broadly exposed extension resources can increase fingerprinting and review surface.",
        evidence,
        recommendation:
          "Expose only the exact resources needed by specific origins or extension IDs.",
        referenceUrl: CHROME_DOCS.webAccessibleResources,
      }),
    );
  }

  for (const evidence of externallyConnectableFindings(manifest)) {
    findings.push(
      addFinding({
        severity: "High",
        category: "External connectivity",
        title: "externally_connectable appears broad",
        explanation:
          "Broad external connectivity can allow many sites or extensions to communicate with this extension.",
        evidence,
        recommendation:
          "Restrict externally_connectable to specific origins or extension IDs that truly need access.",
        referenceUrl: CHROME_DOCS.externallyConnectable,
      }),
    );
  }

  for (const warning of sourceScan.warnings) {
    findings.push(
      addFinding({
        severity: "Info",
        category: "Scan coverage",
        title: warning.title,
        explanation: warning.detail,
        evidence: sourceScan.mode === "manifest-only" ? "manifest.json only" : "zip scan limit",
        recommendation:
          "Upload a complete extension zip within the size limits when you need stronger remote-code and dynamic-execution coverage.",
      }),
    );
  }

  const sortedFindings = findings.sort(
    (a, b) => severityRank[b.severity] - severityRank[a.severity],
  );
  const remoteCodeSummary =
    remoteScripts.length > 0 || dynamicExecution.length > 0
      ? [
          `${remoteScripts.length} remote executable script reference(s) found.`,
          `${dynamicExecution.length} dynamic execution pattern(s) found.`,
        ]
      : sourceScan.mode === "manifest-only"
        ? ["Source files were not scanned, so remote code checks are limited."]
        : ["No remote script or dynamic execution pattern was found in scanned text files."];

  return {
    sourceName: input.sourceName,
    generatedAt: new Date().toISOString(),
    extensionName: extensionName(manifest),
    extensionVersion: extensionVersion(manifest),
    manifestVersion: mv,
    overallRisk: calculateOverallRisk(sortedFindings),
    counts: countFindings(sortedFindings),
    permissionSummary: allPermissions.length > 0 ? allPermissions : ["No extension API permissions declared."],
    hostPermissionSummary:
      hostPermissions.length > 0 ? hostPermissions : ["No host permissions declared."],
    mv3CompatibilitySummary: [
      `manifest_version: ${String(mv)}`,
      background && "service_worker" in background
        ? "MV3 service worker field is present."
        : "No MV3 service worker field detected.",
      manifest.action ? "MV3 action field is present." : "No action field detected.",
    ],
    remoteCodeSummary,
    findings: sortedFindings,
    checklist: checklistFromFindings(sortedFindings),
    disclaimer: DISCLAIMER,
    chineseDisclaimer: CHINESE_DISCLAIMER,
    sourceScan,
  };
}
