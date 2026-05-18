export type Severity = "Critical" | "High" | "Medium" | "Info";

export type OverallRisk = "Low" | "Medium" | "High" | "Critical";

export type Finding = {
  id: string;
  severity: Severity;
  category: string;
  title: string;
  explanation: string;
  evidence: string;
  recommendation: string;
  referenceUrl?: string;
};

export type TextFile = {
  path: string;
  content: string;
  size: number;
  skipped?: boolean;
  skipReason?: string;
};

export type ScanWarning = {
  title: string;
  detail: string;
};

export type SourceScan = {
  mode: "manifest-only" | "zip";
  manifestPath?: string;
  scannedFiles: TextFile[];
  skippedFiles: TextFile[];
  totalTextBytes: number;
  warnings: ScanWarning[];
};

export type AnalysisInput = {
  sourceName: string;
  manifest: ChromeManifest;
  sourceScan: SourceScan;
};

export type Report = {
  sourceName: string;
  generatedAt: string;
  extensionName: string;
  extensionVersion: string;
  manifestVersion: number | "missing" | "unknown";
  overallRisk: OverallRisk;
  counts: Record<Severity, number>;
  permissionSummary: string[];
  hostPermissionSummary: string[];
  mv3CompatibilitySummary: string[];
  remoteCodeSummary: string[];
  findings: Finding[];
  checklist: string[];
  disclaimer: string;
  chineseDisclaimer: string;
  sourceScan: SourceScan;
};

export type ChromeManifest = Record<string, unknown> & {
  manifest_version?: unknown;
  name?: unknown;
  version?: unknown;
  permissions?: unknown;
  optional_permissions?: unknown;
  host_permissions?: unknown;
  optional_host_permissions?: unknown;
  background?: unknown;
  browser_action?: unknown;
  page_action?: unknown;
  action?: unknown;
  content_scripts?: unknown;
  content_security_policy?: unknown;
  web_accessible_resources?: unknown;
  externally_connectable?: unknown;
};
