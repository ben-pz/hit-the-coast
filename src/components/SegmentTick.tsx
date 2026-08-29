'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  emptySnapshot,
  parseDone,
  readRaw,
  subscribe,
  toggleSegment,
} from '@/lib/coast-progress';

/**
 * Tick one segment from its own page. Shares the tracker's storage, so ticking
 * here shows up on /coast and the other way round.
 */
export function SegmentTick({
  segmentId,
  segmentName,
}: {
  segmentId: string;
  segmentName: string;
}) {
  const raw = useSyncExternalStore(subscribe, readRaw, emptySnapshot);
  const done = useMemo(() => parseDone(raw), [raw]);
  const isDone = done.has(segmentId);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => toggleSegment(done, segmentId)}
        aria-pressed={isDone}
        className={`inline-flex items-center gap-3 border px-5 py-3 font-display font-bold transition-colors ${
          isDone
            ? 'border-red bg-red text-ink'
            : 'border-line text-paper hover:border-red hover:text-red-bright'
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center border text-xs ${
            isDone ? 'border-ink bg-ink text-red' : 'border-mute'
          }`}
        >
          {isDone ? '✓' : ''}
        </span>
        {isDone ? 'Done' : 'Mark as run'}
      </button>

      <p role="status" aria-live="polite" className="text-sm text-mute">
        {isDone
          ? `${segmentName} is ticked off. Saved in this browser.`
          : 'Ticks are saved in this browser only, for now.'}
      </p>
    </div>
  );
}
