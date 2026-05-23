const SOURCE_KEY = "ce_preflight_source";
const EVENT_FRAME_TIMEOUT_MS = 10_000;

function sanitizeSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function readSourceFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/from\/([^/]+)/);
  return match ? sanitizeSegment(match[1]) : null;
}

export function rememberSourceFromUrl(): void {
  const source = readSourceFromPath(window.location.pathname);
  if (source) {
    window.sessionStorage.setItem(SOURCE_KEY, source);
  } else if (!window.sessionStorage.getItem(SOURCE_KEY)) {
    window.sessionStorage.setItem(SOURCE_KEY, "direct");
  }
}

export function getCurrentSource(): string {
  return window.sessionStorage.getItem(SOURCE_KEY) ?? "direct";
}

function loadEventPath(path: string): void {
  if (!document.body) return;

  const frame = document.createElement("iframe");
  frame.src = `${path}?t=${Date.now()}`;
  frame.title = "Usage event";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  frame.style.position = "absolute";
  frame.style.width = "1px";
  frame.style.height = "1px";
  frame.style.border = "0";
  frame.style.clip = "rect(0 0 0 0)";
  frame.style.clipPath = "inset(50%)";
  frame.style.overflow = "hidden";

  document.body.appendChild(frame);
  window.setTimeout(() => frame.remove(), EVENT_FRAME_TIMEOUT_MS);
}

export function trackUsageEvent(eventName: string): void {
  const event = sanitizeSegment(eventName);
  if (!event) return;

  const source = getCurrentSource();
  const path = `/event/${source}/${event}`;
  loadEventPath(path);
}
