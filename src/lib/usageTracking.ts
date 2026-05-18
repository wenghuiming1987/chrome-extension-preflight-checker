const SOURCE_KEY = "ce_preflight_source";

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

export function trackUsageEvent(eventName: string): void {
  const event = sanitizeSegment(eventName);
  if (!event) return;

  const source = getCurrentSource();
  const path = `/event/${source}/${event}`;
  if (window.location.pathname === path) return;

  window.history.pushState({ preflightEvent: event, source }, "", path);
}
