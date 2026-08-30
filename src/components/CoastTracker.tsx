'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { buttonClass } from './ui';
import {
  emptySnapshot,
  parseDone,
  readRaw,
  subscribe,
  toggleSegment,
  writeDone,
} from '@/lib/coast-progress';
import {
  coastSegments,
  HALF_DAY_LIMIT,
  isHalfDay,
  milesInArea,
  segmentsByArea,
  totalCoastMiles,
  type CoastSegment,
} from '@/data/coast-segments';
import { tipCountFor } from '@/data/segment-tips';
import { photoCountFor } from '@/data/segment-photos';

type LengthFilter = 'all' | 'half' | 'full';

/**
 * The coast tracker — the site's main feature.
 *
 * No accounts and no backend yet: ticks live in the visitor's browser through
 * `@/lib/coast-progress`, which is the single place to change when accounts
 * arrive. Everything above it stays as it is.
 */
export function CoastTracker({ compact = false }: { compact?: boolean }) {
  const raw = useSyncExternalStore(subscribe, readRaw, emptySnapshot);
  const [lengthFilter, setLengthFilter] = useState<LengthFilter>('all');

  const done = useMemo(() => parseDone(raw), [raw]);

  const toggle = useCallback(
    (id: string) => toggleSegment(done, id),
    [done],
  );

  const milesDone = coastSegments
    .filter((segment) => done.has(segment.id))
    .reduce((sum, segment) => sum + segment.distanceMiles, 0);

  const percent = (milesDone / totalCoastMiles) * 100;

  const matchesFilter = useCallback(
    (segment: CoastSegment) =>
      lengthFilter === 'all' ||
      (lengthFilter === 'half' ? isHalfDay(segment) : !isHalfDay(segment)),
    [lengthFilter],
  );

  const groups = segmentsByArea()
    .map((group) => ({ ...group, visible: group.segments.filter(matchesFilter) }))
    .filter((group) => group.visible.length > 0);

  const halfDays = coastSegments.filter(isHalfDay).length;
  const fullDays = coastSegments.length - halfDays;

  return (
    <div>
      {/* ------------------------------------------------------- headline */}
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

        {/* One block per segment, width by distance. A schematic, not a map. */}
        <div className="mt-8">
          <div
            className="flex h-10 gap-px overflow-hidden border border-line"
            role="img"
            aria-label={`Coast completion: ${percent.toFixed(1)} per cent, ${milesDone.toFixed(
              1,
            )} of ${totalCoastMiles.toFixed(1)} miles.`}
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

        {compact ? (
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/coast" className={buttonClass('primary', 'lg')}>
              Tick off what you’ve run
            </Link>
            <Link href="/newsletter" className={buttonClass('secondary', 'lg')}>
              Save your progress
            </Link>
          </div>
        ) : null}
      </div>

      {compact ? null : (
        <>
          {/* -------------------------------------------------------- filter */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter segments by length"
            >
              {(
                [
                  ['all', `Everything (${coastSegments.length})`],
                  ['half', `Half days (${halfDays})`],
                  ['full', `Full days (${fullDays})`],
                ] as [LengthFilter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={lengthFilter === value}
                  onClick={() => setLengthFilter(value)}
                  className={`label border px-3 py-2 transition-colors ${
                    lengthFilter === value
                      ? 'border-red bg-red text-ink'
                      : 'border-line text-mute hover:border-mute hover:text-paper'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-mute">
              Half days are up to {HALF_DAY_LIMIT} miles. Two adjacent segments in
              one session is a full day out.
            </p>
          </div>

          {/* ------------------------------------------------------ segments */}
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
                    {areaDone % 1 === 0 ? areaDone : areaDone.toFixed(1)} /{' '}
                    {areaTotal} miles
                  </p>
                </div>

                <ul className="divide-y divide-line border-b border-line">
                  {group.visible.map((segment) => (
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
                onClick={() => writeDone([])}
                className={buttonClass('secondary', 'md')}
              >
                Clear everything
              </button>
            </div>
          ) : null}
        </>
      )}
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
  const half = isHalfDay(segment);
  const tips = tipCountFor(segment.id);
  const photos = photoCountFor(segment.id);

  const infoParts = [
    tips > 0 ? `${tips} tip${tips === 1 ? '' : 's'}` : null,
    photos > 0 ? `${photos} photo${photos === 1 ? '' : 's'}` : null,
  ].filter((part): part is string => part !== null);
  const infoLabel =
    infoParts.length > 0
      ? `Segment info · ${infoParts.join(', ')}`
      : 'Segment info, tips & photos';

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
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={`label ${half ? 'text-mute' : 'text-red-bright'}`}>
              {half ? 'Half day' : 'Full day'}
            </span>
            <Link
              href={`/coast/${segment.id}`}
              className="label text-mute underline underline-offset-4 hover:text-red-bright"
            >
              {infoLabel} →
            </Link>
            {segment.distanceSource === 'split' ? (
              <span className="text-xs text-mute">
                part of {segment.officialStage}
              </span>
            ) : null}
          </p>
          {segment.note ? (
            <p className="mt-2 text-sm leading-relaxed text-mute">
              {segment.note}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-sm">
            {segment.distanceMiles}
            <span className="text-mute"> mi</span>
          </p>
          {segment.distanceSource !== 'official' ? (
            <p
              className="label mt-1 text-mute"
              title={
                segment.distanceSource === 'split'
                  ? 'Half of an official stage — the pair sums to the published distance, but where the split falls is our estimate'
                  : 'Our split of an official stage that crosses the county border'
              }
            >
              approx
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}
