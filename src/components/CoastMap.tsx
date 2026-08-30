'use client';

import type { SVGProps } from 'react';
import {
  COAST_MAP_VIEWBOX,
  coastMapSegments,
  pointsAttr,
} from '@/data/coast-path-geometry';
import { getSegment } from '@/data/coast-segments';

/**
 * The real shape of the Cornwall coast path, one polyline per segment,
 * coloured in as a visitor ticks segments off. See
 * `src/data/coast-path-geometry.ts` for where the geometry comes from.
 *
 * Visual only, same as the schematic bar it replaces — segments are ticked
 * off from the list below, not from the map, so there is no click handler
 * here to keep the hit target from being a thin, fiddly line on a phone.
 */
export function CoastMap({ done }: { done: Set<string> }) {
  const { width, height } = COAST_MAP_VIEWBOX;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Map of the Cornwall coast path, coloured in where it has been run"
    >
      {coastMapSegments.map((mapSegment) => {
        const isDone = done.has(mapSegment.id);
        const segment = getSegment(mapSegment.id);
        // A `title` attribute, not a nested SVG <title> element: the latter
        // collides with Next's own streaming-metadata title handling in dev
        // (it scans the tree for <title> tags) and triggers a hydration
        // mismatch. The attribute gives the same native hover tooltip
        // without being a tag Next goes looking for.
        const label = segment
          ? `${segment.name}${isDone ? ' (done)' : ''}`
          : undefined;
        // `title` is a valid attribute on any SVG element (native hover
        // tooltip) but React's SVGProps type omits it — it only appears in
        // its own typing as the <title> child element. Widen locally rather
        // than reintroducing that element.
        const polylineProps: SVGProps<SVGPolylineElement> & {
          title?: string;
        } = {
          points: pointsAttr(mapSegment),
          title: label,
          fill: 'none',
          stroke: isDone ? 'var(--color-red)' : 'var(--color-ink-600)',
          strokeWidth: isDone ? 5 : 4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          style: { transition: 'stroke 300ms' },
        };
        return <polyline key={mapSegment.id} {...polylineProps} />;
      })}
    </svg>
  );
}
