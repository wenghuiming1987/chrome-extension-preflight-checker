import JSZip from "jszip";
import {
  LIMITS,
  TEXT_FILE_EXTENSIONS,
} from "./constants";
import type { AnalysisInput, ChromeManifest, SourceScan, TextFile } from "./types";

const encoder = new TextEncoder();

function byteLength(value: string): number {
  return encoder.encode(value).byteLength;
}

function isTextFile(path: string): boolean {
  const lowerPath = path.toLowerCase();
  return TEXT_FILE_EXTENSIONS.some((extension) => lowerPath.endsWith(extension));
}

function getEntrySize(entry: JSZip.JSZipObject): number | undefined {
  const withData = entry as JSZip.JSZipObject & {
    _data?: { uncompressedSize?: number };
  };
  return withData._data?.uncompressedSize;
}

function parseManifest(text: string): ChromeManifest {
  const parsed = JSON.parse(text) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("manifest.json must contain a JSON object.");
  }
  return parsed as ChromeManifest;
}

function emptyScan(mode: SourceScan["mode"]): SourceScan {
  return {
    mode,
    scannedFiles: [],
    skippedFiles: [],
    totalTextBytes: 0,
    warnings: [],
  };
}

function chooseManifestEntry(entries: JSZip.JSZipObject[]): JSZip.JSZipObject | undefined {
  const manifestEntries = entries
    .filter((entry) => !entry.dir && entry.name.toLowerCase().endsWith("manifest.json"))
    .sort((a, b) => {
      const aRoot = a.name.toLowerCase() === "manifest.json" ? 0 : 1;
      const bRoot = b.name.toLowerCase() === "manifest.json" ? 0 : 1;
      return aRoot - bRoot || a.name.length - b.name.length;
    });
  return manifestEntries[0];
}

async function readTextEntry(entry: JSZip.JSZipObject): Promise<TextFile> {
  const content = await entry.async("string");
  return {
    path: entry.name,
    content,
    size: byteLength(content),
  };
}

export async function readInputFile(file: File): Promise<AnalysisInput> {
  const lowerName = file.name.toLowerCase();
  if (lowerName.endsWith(".json")) {
    const text = await file.text();
    const manifest = parseManifest(text);
    return {
      sourceName: file.name,
      manifest,
      sourceScan: {
        ...emptyScan("manifest-only"),
        manifestPath: file.name,
        warnings: [
          {
            title: "Source files were not scanned",
            detail:
              "Only manifest.json was provided, so static checks for remote scripts and dynamic execution are limited.",
          },
        ],
      },
    };
  }

  if (!lowerName.endsWith(".zip")) {
    throw new Error("Please choose a manifest.json file or an extension.zip file.");
  }

  const zip = await JSZip.loadAsync(file);
  const entries = Object.values(zip.files).filter((entry) => !entry.dir);
  const manifestEntry = chooseManifestEntry(entries);
  if (!manifestEntry) {
    throw new Error("No manifest.json file was found inside the zip.");
  }

  const manifestText = await manifestEntry.async("string");
  const manifest = parseManifest(manifestText);
  const sourceScan = emptyScan("zip");
  sourceScan.manifestPath = manifestEntry.name;

  const shouldSkipSourceScan =
    file.size > LIMITS.maxZipBytes || entries.length > LIMITS.maxZipFiles;

  if (file.size > LIMITS.maxZipBytes) {
    sourceScan.warnings.push({
      title: "Zip size limit exceeded",
      detail:
        "The zip is larger than 20MB. manifest.json was parsed, but source scanning was skipped to avoid freezing the browser.",
    });
  }

  if (entries.length > LIMITS.maxZipFiles) {
    sourceScan.warnings.push({
      title: "File count limit exceeded",
      detail:
        "The zip contains more than 1000 files. manifest.json was parsed, but source scanning was skipped to avoid freezing the browser.",
    });
  }

  if (shouldSkipSourceScan) {
    return { sourceName: file.name, manifest, sourceScan };
  }

  const textEntries = entries.filter((entry) => isTextFile(entry.name));

  for (const entry of textEntries) {
    const declaredSize = getEntrySize(entry);
    if (declaredSize && declaredSize > LIMITS.maxSingleTextBytes) {
      sourceScan.skippedFiles.push({
        path: entry.name,
        content: "",
        size: declaredSize,
        skipped: true,
        skipReason: "Single text file limit exceeded.",
      });
      continue;
    }

    const textFile = await readTextEntry(entry);
    if (textFile.size > LIMITS.maxSingleTextBytes) {
      sourceScan.skippedFiles.push({
        ...textFile,
        content: "",
        skipped: true,
        skipReason: "Single text file limit exceeded.",
      });
      continue;
    }

    if (sourceScan.totalTextBytes + textFile.size > LIMITS.maxTotalTextBytes) {
      sourceScan.skippedFiles.push({
        path: entry.name,
        content: "",
        size: textFile.size,
        skipped: true,
        skipReason: "Total text scan limit exceeded.",
      });
      continue;
    }

    sourceScan.totalTextBytes += textFile.size;
    sourceScan.scannedFiles.push(textFile);
  }

  if (sourceScan.skippedFiles.length > 0) {
    sourceScan.warnings.push({
      title: "Source scan was incomplete",
      detail:
        "Some text files were skipped because one of the browser safety limits was reached.",
    });
  }

  return { sourceName: file.name, manifest, sourceScan };
}
