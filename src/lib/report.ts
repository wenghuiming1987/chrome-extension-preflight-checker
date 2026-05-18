import type { Finding, Report, Severity } from "./types";

function list(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function findingBlock(finding: Finding): string {
  return [
    `### ${finding.severity}: ${finding.title}`,
    "",
    `- Category: ${finding.category}`,
    `- Explanation: ${finding.explanation}`,
    `- Evidence: ${finding.evidence}`,
    `- Recommendation: ${finding.recommendation}`,
    finding.referenceUrl ? `- Reference: ${finding.referenceUrl}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export function reportToMarkdown(report: Report): string {
  const counts = (["Critical", "High", "Medium", "Info"] as Severity[])
    .map((severity) => `- ${severity}: ${report.counts[severity]}`)
    .join("\n");

  return [
    `# Chrome Extension Preflight Report`,
    "",
    `Generated: ${report.generatedAt}`,
    `Source file: ${report.sourceName}`,
    "",
    "## Summary",
    "",
    `- Extension name: ${report.extensionName}`,
    `- Extension version: ${report.extensionVersion}`,
    `- manifest_version: ${String(report.manifestVersion)}`,
    `- Overall risk level: ${report.overallRisk}`,
    "",
    "## Finding Counts",
    "",
    counts,
    "",
    "## Permission Summary",
    "",
    list(report.permissionSummary),
    "",
    "## Host Permission Summary",
    "",
    list(report.hostPermissionSummary),
    "",
    "## MV3 Compatibility Summary",
    "",
    list(report.mv3CompatibilitySummary),
    "",
    "## Remote Code Summary",
    "",
    list(report.remoteCodeSummary),
    "",
    "## Detailed Findings",
    "",
    report.findings.length > 0
      ? report.findings.map(findingBlock).join("\n\n")
      : "No static findings were produced by the current rule set.",
    "",
    "## Remediation Checklist",
    "",
    report.checklist.map((item) => `- [ ] ${item}`).join("\n"),
    "",
    "## Scan Coverage",
    "",
    `- Mode: ${report.sourceScan.mode}`,
    `- Manifest path: ${report.sourceScan.manifestPath ?? "Not available"}`,
    `- Scanned text files: ${report.sourceScan.scannedFiles.length}`,
    `- Skipped text files: ${report.sourceScan.skippedFiles.length}`,
    `- Total scanned text: ${Math.round(report.sourceScan.totalTextBytes / 1024)} KB`,
    "",
    "## Disclaimer",
    "",
    report.disclaimer,
    "",
    report.chineseDisclaimer,
    "",
  ].join("\n");
}

export function downloadTextFile(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function safeReportFilename(report: Report, extension: "md" | "json"): string {
  const name = report.extensionName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  return `${name || "extension"}-preflight-report.${extension}`;
}
