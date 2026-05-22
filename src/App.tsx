import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { analyzeExtension } from "./lib/analyzer";
import { readInputFile } from "./lib/fileReader";
import {
  downloadTextFile,
  reportToMarkdown,
  safeReportFilename,
} from "./lib/report";
import type { Finding, Report, Severity } from "./lib/types";
import { rememberSourceFromUrl, trackUsageEvent } from "./lib/usageTracking";
import { SAMPLE_REPORTS } from "./samples";

const severityOrder: Severity[] = ["Critical", "High", "Medium", "Info"];

const severityLabels: Record<Severity, string> = {
  Critical: "Critical",
  High: "High",
  Medium: "Medium",
  Info: "Info",
};

type SampleKind = "high" | "low";
type ReportOrigin = "file" | "sample-high" | "sample-low";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: string;
}) {
  return (
    <div className={`summary-stat ${tone ?? ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className={`finding finding-${finding.severity.toLowerCase()}`}>
      <div className="finding-head">
        <span className={`severity severity-${finding.severity.toLowerCase()}`}>
          {finding.severity}
        </span>
        <span>{finding.category}</span>
      </div>
      <h3>{finding.title}</h3>
      <p>{finding.explanation}</p>
      <dl>
        <div>
          <dt>Evidence</dt>
          <dd>{finding.evidence}</dd>
        </div>
        <div>
          <dt>Recommendation</dt>
          <dd>{finding.recommendation}</dd>
        </div>
        {finding.referenceUrl ? (
          <div>
            <dt>Reference</dt>
            <dd>
              <a href={finding.referenceUrl} target="_blank" rel="noreferrer">
                Chrome documentation
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

function ReportPanel({
  report,
  reportOrigin,
  onExportMarkdown,
  onExportJson,
  onChooseFile,
}: {
  report: Report;
  reportOrigin: ReportOrigin;
  onExportMarkdown: () => void;
  onExportJson: () => void;
  onChooseFile: () => void;
}) {
  const topFindings = useMemo(() => report.findings.slice(0, 6), [report.findings]);
  const isSampleReport = reportOrigin !== "file";

  return (
    <main className="report-grid">
      <section className="panel summary-panel" aria-labelledby="summary-title">
        <div className="section-head">
          <div>
            <h2 id="summary-title">Report summary</h2>
            <p>
              Static risk signals for MV3 compatibility, permissions, host access,
              CSP, and remote code review.
            </p>
          </div>
          <div className={`risk-badge risk-${report.overallRisk.toLowerCase()}`}>
            {report.overallRisk}
          </div>
        </div>

        <div
          className={`report-context ${
            isSampleReport ? "report-context-demo" : "report-context-file"
          }`}
        >
          <div>
            <strong>{isSampleReport ? "Demo report loaded" : "Your file report"}</strong>
            <span>
              {isSampleReport
                ? "This sample shows the kind of issues the checker can surface. Upload your own manifest.json or extension.zip for a real local scan."
                : "This report was generated from the file you selected. Files stayed in this browser session."}
            </span>
          </div>
          {isSampleReport ? (
            <button className="secondary-button compact-button" type="button" onClick={onChooseFile}>
              Analyze your extension
            </button>
          ) : null}
        </div>

        <div className="summary-grid">
          <SummaryStat label="Extension" value={report.extensionName} />
          <SummaryStat label="Version" value={report.extensionVersion} />
          <SummaryStat label="Manifest" value={String(report.manifestVersion)} />
          <SummaryStat
            label="Scanned text"
            value={formatBytes(report.sourceScan.totalTextBytes)}
          />
        </div>

        <div className="count-row" aria-label="Finding count by severity">
          {severityOrder.map((severity) => (
            <div key={severity} className={`count-pill count-${severity.toLowerCase()}`}>
              <span>{severityLabels[severity]}</span>
              <strong>{report.counts[severity]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="signals-title">
        <h2 id="signals-title">Key signals</h2>
        <div className="signal-columns">
          <div>
            <h3>Permissions</h3>
            <ul>
              {report.permissionSummary.map((item, index) => (
                <li key={`permission-${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Host permissions</h3>
            <ul>
              {report.hostPermissionSummary.map((item, index) => (
                <li key={`host-${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>MV3 compatibility</h3>
            <ul>
              {report.mv3CompatibilitySummary.map((item, index) => (
                <li key={`mv3-${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Remote code</h3>
            <ul>
              {report.remoteCodeSummary.map((item, index) => (
                <li key={`remote-${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="findings-title">
        <div className="section-head">
          <div>
            <h2 id="findings-title">Detailed findings</h2>
            <p>
              Findings are static review prompts, not a final security verdict.
            </p>
          </div>
          <span className="muted">{report.findings.length} findings</span>
        </div>
        <div className="finding-list">
          {report.findings.length > 0 ? (
            report.findings.map((finding, index) => (
              <FindingCard key={`${finding.id}-${index}`} finding={finding} />
            ))
          ) : (
            <div className="empty-state">
              No findings from the first-version rule set. Keep permissions narrow
              and run a human review before submission-critical releases.
            </div>
          )}
        </div>
      </section>

      <aside className="side-stack">
        <section className="panel checklist-panel" aria-labelledby="checklist-title">
          <h2 id="checklist-title">Remediation checklist</h2>
          <ul className="checklist">
            {report.checklist.map((item, index) => (
              <li key={`checklist-${index}-${item}`}>
                <input type="checkbox" aria-label={item} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel export-panel" aria-labelledby="export-title">
          <h2 id="export-title">Export report</h2>
          <p>
            Save the current report as Markdown for issue trackers, review notes,
            or a manual submission checklist.
          </p>
          <div className="button-row">
            <button className="primary-button" type="button" onClick={onExportMarkdown}>
              Export Markdown
            </button>
            <button className="secondary-button" type="button" onClick={onExportJson}>
              Export JSON
            </button>
          </div>
        </section>

        <section className="panel service-panel" aria-labelledby="service-title">
          <h2 id="service-title">Already rejected?</h2>
          <p>
            Need a human eye before Chrome Web Store resubmission? Send the
            rejection note and your report context for MV3, permissions, remote
            code, CSP, and review-readiness feedback.
          </p>
          <a
            className="primary-button link-button"
            href={`mailto:whm5294186@gmail.com?subject=${encodeURIComponent(
              "Chrome Web Store rejection review request",
            )}`}
            onClick={() => trackUsageEvent("manual-review-click")}
          >
            Ask for manual review
          </a>
        </section>

        <section className="panel coverage-panel" aria-labelledby="coverage-title">
          <h2 id="coverage-title">Scan coverage</h2>
          <dl>
            <div>
              <dt>Mode</dt>
              <dd>{report.sourceScan.mode}</dd>
            </div>
            <div>
              <dt>Manifest</dt>
              <dd>{report.sourceScan.manifestPath ?? "Not found"}</dd>
            </div>
            <div>
              <dt>Text files scanned</dt>
              <dd>{report.sourceScan.scannedFiles.length}</dd>
            </div>
            <div>
              <dt>Text files skipped</dt>
              <dd>{report.sourceScan.skippedFiles.length}</dd>
            </div>
          </dl>
        </section>
      </aside>

      {topFindings.length > 0 ? (
        <section className="panel compact-findings" aria-labelledby="compact-title">
          <h2 id="compact-title">Top review prompts</h2>
          <ol>
            {topFindings.map((finding, index) => (
              <li key={`${finding.id}-compact-${index}`}>
                <span className={`severity severity-${finding.severity.toLowerCase()}`}>
                  {finding.severity}
                </span>
                <span>{finding.title}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </main>
  );
}

export default function App() {
  const [report, setReport] = useState<Report>(() => SAMPLE_REPORTS.high());
  const [reportOrigin, setReportOrigin] = useState<ReportOrigin>("sample-high");
  const [status, setStatus] = useState(
    "High-risk demo report loaded. Upload your own file when ready.",
  );
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    rememberSourceFromUrl();
  }, []);

  const openFilePicker = useCallback(() => {
    trackUsageEvent("choose-file-click");
    inputRef.current?.click();
  }, []);

  const scrollToReport = useCallback(() => {
    document.getElementById("summary-title")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const loadSample = useCallback((kind: SampleKind) => {
    const isHigh = kind === "high";
    setReport(isHigh ? SAMPLE_REPORTS.high() : SAMPLE_REPORTS.low());
    setReportOrigin(isHigh ? "sample-high" : "sample-low");
    setStatus(isHigh ? "High-risk demo report loaded." : "Low-risk demo report loaded.");
    setError(null);
    trackUsageEvent(`sample-${kind}`);
  }, []);

  const trySampleReport = useCallback(() => {
    loadSample("high");
    window.setTimeout(scrollToReport, 0);
  }, [loadSample, scrollToReport]);

  const viewSampleReport = useCallback(() => {
    trackUsageEvent("view-sample-report");
    scrollToReport();
  }, [scrollToReport]);

  const analyzeFile = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setStatus(`Analyzing ${file.name} in your browser...`);
    trackUsageEvent("upload-file");
    try {
      const input = await readInputFile(file);
      const nextReport = analyzeExtension(input);
      setReport(nextReport);
      setReportOrigin("file");
      setStatus(`Report generated for ${file.name}.`);
      trackUsageEvent("report-generated");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to analyze this file.";
      setError(message);
      setStatus("Analysis failed.");
      trackUsageEvent("analysis-failed");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void analyzeFile(file);
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget === event.target) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void analyzeFile(file);
  };

  const exportMarkdown = () => {
    trackUsageEvent("export-markdown");
    downloadTextFile(
      safeReportFilename(report, "md"),
      reportToMarkdown(report),
      "text/markdown;charset=utf-8",
    );
  };

  const exportJson = () => {
    trackUsageEvent("export-json");
    downloadTextFile(
      safeReportFilename(report, "json"),
      JSON.stringify(report, null, 2),
      "application/json;charset=utf-8",
    );
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <nav className="topbar" aria-label="Primary">
          <a className="brand" href="/">
            <span className="brand-mark">CE</span>
            <span>Rejection Checker</span>
          </a>
          <a className="nav-link" href="#disclaimer">
            Disclaimer
          </a>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              <span>Catch Chrome</span>
              <span>Web Store</span>
              <span>rejections</span>
              <span>before review</span>
            </h1>
            <p className="privacy-line">
              Files stay in your browser. No upload. No login. No API.
            </p>
            <p className="hero-text">
              Free static checks for MV3, broad permissions, host access, CSP,
              remote code, and dynamic execution patterns that can get Chrome
              extensions rejected or stuck in review.
            </p>
            <ul className="hero-proof" aria-label="What the demo shows">
              <li>Try a sample report without uploading anything.</li>
              <li>Analyze manifest.json or extension.zip locally.</li>
              <li>Export Markdown for review notes or manual fixes.</li>
            </ul>
            <div className="hero-actions">
              <button
                className="primary-button"
                type="button"
                onClick={trySampleReport}
              >
                Try sample manifest
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={openFilePicker}
              >
                Upload your manifest
              </button>
              <button
                className="text-button hero-report-link"
                type="button"
                onClick={viewSampleReport}
              >
                View sample report
              </button>
            </div>
            <div className="pain-grid" aria-label="Why run a static check before review">
              <div>
                <strong>Avoid rejection surprises</strong>
                <span>Flag Blue/Yellow Argon-style remote code, CSP, and MV3 signals before submission.</span>
              </div>
              <div>
                <strong>Reduce review friction</strong>
                <span>See broad permissions, host access, early content scripts, and risky defaults in one report.</span>
              </div>
              <div>
                <strong>Keep code private</strong>
                <span>Parsing runs in this browser session. Your extension package is not uploaded.</span>
              </div>
            </div>
          </div>

          <section
            className={`upload-panel ${isDragging ? "upload-panel-dragging" : ""}`}
            aria-labelledby="upload-title"
            onDrop={handleDrop}
            onDragEnter={handleDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <h2 id="upload-title">Upload area</h2>
            <label
              className={`dropzone ${isAnalyzing ? "dropzone-busy" : ""}`}
              onClick={() => trackUsageEvent("choose-file-click")}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".json,.zip,application/json,application/zip"
                onChange={handleFileChange}
              />
              <span className="dropzone-title">
                Drop manifest.json or extension.zip
              </span>
              <span className="dropzone-detail">
                Zip max 20MB. Max 1000 files. Text scan max 10MB.
              </span>
            </label>
            <div className="sample-callout">
              <h3>No extension file ready?</h3>
              <p>
                Try the built-in high-risk sample first, then upload your own
                package when you want real scan results.
              </p>
              <div className="button-row">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={trySampleReport}
                >
                  Try sample manifest
                </button>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => loadSample("low")}
                >
                  Load low-risk demo
                </button>
              </div>
            </div>
            <div className={`status-line ${error ? "status-error" : ""}`}>
              <span>{isAnalyzing ? "Analyzing" : "Status"}</span>
              <strong>{error ?? status}</strong>
            </div>
          </section>
        </div>
      </header>

      <ReportPanel
        report={report}
        reportOrigin={reportOrigin}
        onExportMarkdown={exportMarkdown}
        onExportJson={exportJson}
        onChooseFile={openFilePicker}
      />

      <footer id="disclaimer" className="footer-disclaimer">
        <p>{report.disclaimer}</p>
        <p>{report.chineseDisclaimer}</p>
      </footer>
    </div>
  );
}
