/**
 * Where a visitor's coast progress lives.
 *
 * One module so the tracker and the individual segment pages read and write the
 * same thing, and so there is exactly one place to change when accounts arrive:
 * swap the localStorage calls for API calls and everything above keeps working.
 *
 * Read through `useSyncExternalStore` (see `useCoastProgress`) rather than an
 * effect, so the static HTML and the hydrated page agree and two open tabs stay
 * in step.
 */

export const STORAGE_KEY = 'coastal-running:coast-progress';

/** Returns the raw string so snapshots compare by value and stay stable. */
export function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    // Private window or blocked storage — the page still works for this visit.
    return '';
  }
}

const listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

export function parseDone(raw: string): Set<string> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
  } catch {
    return new Set();
  }
}

export function writeDone(ids: Iterable<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Ignored deliberately — see readRaw.
  }
  listeners.forEach((listener) => listener());
}

export function toggleSegment(done: Set<string>, id: string): void {
  const next = new Set(done);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  writeDone(next);
}

/** Server snapshot: nothing is ticked until the browser says otherwise. */
export const emptySnapshot = () => '';
