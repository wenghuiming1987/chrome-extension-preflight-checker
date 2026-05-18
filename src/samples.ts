import highRiskManifestRaw from "../examples/high-risk-manifest.json?raw";
import lowRiskManifestRaw from "../examples/low-risk-manifest.json?raw";
import { analyzeExtension } from "./lib/analyzer";
import type { ChromeManifest, Report } from "./lib/types";

function sampleReport(name: string, rawManifest: string): Report {
  const manifest = JSON.parse(rawManifest) as ChromeManifest;
  return analyzeExtension({
    sourceName: name,
    manifest,
    sourceScan: {
      mode: "manifest-only",
      manifestPath: name,
      scannedFiles: [],
      skippedFiles: [],
      totalTextBytes: 0,
      warnings: [
        {
          title: "Source files were not scanned",
          detail:
            "This sample loads a manifest only. Upload the sample zip to exercise source-file checks.",
        },
      ],
    },
  });
}

export const SAMPLE_REPORTS = {
  low: () => sampleReport("examples/low-risk-manifest.json", lowRiskManifestRaw),
  high: () => sampleReport("examples/high-risk-manifest.json", highRiskManifestRaw),
};
