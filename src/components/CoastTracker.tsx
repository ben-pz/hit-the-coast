'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { buttonClass } from './ui';
import {
  coastSegments,
  milesInArea,
  segmentsByArea,
  totalCoastMiles,
  type CoastSegment,
} from '@/data/coast-segments';

/**
 * Manual coast-completion tracking, stored in the visitor's own browser.
 *
 * Roadmap step 2: no accounts, no backend, no verification — just enough to
 * find out whether people actually want this before building the rest. When
 * accounts and GPX verification arrive, this component keeps its shape and the
 * storage layer underneath it changes.
 *
 * State lives in localStorage and is read through useSyncExternalStore so the
 * static HTML and the hydrated page agree, and so two open tabs stay in step.
 */

const STORAGE_KEY = 'coastal-running:coast-progress';

/** Reads the raw string so snapshots compare by value and stay stable. */
function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function write(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Private window or blocked storage — the page still works for this visit.
  }
  emit();
}

export function CoastTracker() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '');

  const done = useMemo(() => {
    if (!raw) return new Set<string>();
    try {
      const parsed: unknown = JSON.parse(raw);
      return new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
    } catch {
      return new Set<string>();
    }
  }, [raw]);

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(done);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      write([...next]);
    },
    [done],
  );

  const clear = useCallback(() => write([]), []);

  const milesDone = coastSegments
    .filter((segment) => done.has(segment.id))
    .reduce((sum, segment) => sum + segment.distanceMiles, 0);

  const percent = (milesDone / totalCoastMiles) * 100;
  const groups = segmentsByArea();

  return (
    <div>
      {/* ------------------------------------------------------ headline */}
      <div className="border border-line bg-ink-800 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-red">Your coast</p>
            <p className="mt-3 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-none">
              {milesDone % 1 === 0 ? milesDone : milesDone.toFixed(1)}
              <span className="text-mute"> / {totalCoastMiles.toFixed(1)}</span>
            </p>
            <p className="mt-2 text-sm text-mute">
              miles of the Cornish coast path, across{' '}
              <span className="font-mono text-paper">{done.size}</span> of{' '}
              {coastSegments.length} segments
            </p>
          </div>
          <p
            className="font-display text-5xl font-extrabold text-red"
            aria-hidden="true"
          >
            {percent.toFixed(1)}%
          </p>
        </div>

        {/* Schematic of the coast: one block per segment, width by distance.
            Not a map — a proportional strip, until real geometry exists. */}
        <div className="mt-8">
          <div
            className="flex h-10 gap-px overflow-hidden border border-line"
            role="img"
            aria-label={`Coast completion: ${percent.toFixed(
              1,
            )} per cent, ${milesDone.toFixed(1)} of ${totalCoastMiles.toFixed(
              1,
            )} miles.`}
          >
            {coastSegments.map((segment) => (
              <span
                key={segment.id}
                title={`${segment.name} — ${segment.distanceMiles} miles${
                  done.has(segment.id) ? ' (done)' : ''
                }`}
                style={{ flexGrow: segment.distanceMiles }}
                className={
                  done.has(segment.id)
                    ? 'bg-red transition-colors duration-300'
                    : 'bg-ink-600 transition-colors duration-300'
                }
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            <span className="label text-mute">Marsland Mouth</span>
            <span className="label text-mute">Land’s End</span>
            <span className="label text-mute">Cremyll</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------- segments */}
      {groups.map((group) => {
        const areaTotal = milesInArea(group.area);
        const areaDone = group.segments
          .filter((segment) => done.has(segment.id))
          .reduce((sum, segment) => sum + segment.distanceMiles, 0);
        const complete = areaDone === areaTotal;

        return (
          <section key={group.area} className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3">
              <h2 className="text-2xl">
                {group.area}
                {complete ? (
                  <span className="ml-3 align-middle text-base text-red">
                    ✦ complete
                  </span>
                ) : null}
              </h2>
              <p className="font-mono text-sm text-mute">
                {areaDone % 1 === 0 ? areaDone : areaDone.toFixed(1)} / {areaTotal}{' '}
                miles
              </p>
            </div>

            <ul className="divide-y divide-line border-b border-line">
              {group.segments.map((segment) => (
                <SegmentRow
                  key={segment.id}
                  segment={segment}
                  done={done.has(segment.id)}
                  onToggle={toggle}
                />
              ))}
            </ul>
          </section>
        );
      })}

      {done.size > 0 ? (
        <div className="mt-10">
          <button
            type="button"
            onClick={clear}
            className={buttonClass('secondary', 'md')}
          >
            Clear everything
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SegmentRow({
  segment,
  done,
  onToggle,
}: {
  segment: CoastSegment;
  done: boolean;
  onToggle: (id: string) => void;
}) {
  const inputId = `segment-${segment.id}`;

  return (
    <li className={done ? 'opacity-60' : ''}>
      <div className="flex items-start gap-4 py-4">
        <input
          id={inputId}
          type="checkbox"
          checked={done}
          onChange={() => onToggle(segment.id)}
          className="mt-1.5 h-5 w-5 shrink-0 cursor-pointer accent-[#e64a33]"
        />
        <div className="min-w-0 flex-1">
          <label
            htmlFor={inputId}
            className={`cursor-pointer font-display text-lg font-bold ${
              done ? 'line-through' : ''
            }`}
          >
            {segment.name}
          </label>
          {segment.note ? (
            <p className="mt-1 text-sm leading-relaxed text-mute">
              {segment.note}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-sm">
            {segment.distanceMiles}
            <span className="text-mute"> mi</span>
          </p>
          {segment.distanceSource === 'approximate' ? (
            <p className="label mt-1 text-mute" title="Our split of an official stage that crosses the county border">
              approx
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}
