const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const longDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "19 Sep 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** "Saturday 19 September 2026" */
export function formatLongDate(iso: string): string {
  return longDateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** "19–20 Sep 2026" for multi-day events, otherwise a single date. */
export function formatDateRange(start: string, end?: string): string {
  if (!end) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** Month key used by the events filter, e.g. "2026-09". */
export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

const monthFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "September 2026" */
export function formatMonth(key: string): string {
  return monthFormatter.format(new Date(`${key}-01T00:00:00Z`));
}

export function formatDistance(km: number): string {
  return `${km % 1 === 0 ? km : km.toFixed(1)}K`;
}

export function formatElevation(metres?: number): string {
  return metres == null ? '—' : `${metres.toLocaleString('en-GB')}m`;
}
