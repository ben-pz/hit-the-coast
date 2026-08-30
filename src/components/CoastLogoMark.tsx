import type { CSSProperties } from 'react';

/**
 * The site's mark: the traced outline of the Cornwall coast path.
 *
 * Same source geometry as the map on `/coast` (see `coast-path-geometry.ts`)
 * — every stage concatenated into one line and simplified further, since a
 * mark this small only needs to read as a coastline, not carry 45 individual
 * segments. Pure vector, so it stays crisp from a 24px header mark up to a
 * 512px share image; nothing here is a raster export of the other.
 *
 * Plain line art, no background — sits directly on whatever it's placed on,
 * matching the lockup Benjamin supplied (August 2026).
 */
export function CoastLogoMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      role="img"
      aria-label="Hit the Coast"
    >
      <polyline
        points="68.59,14.43 69.41,18.6 68.72,22.43 64.28,25.64 64.33,27.16 62.8,29.01 59.07,30.86 57.55,36.13 53.48,36.67 52.71,37.65 50.39,37.2 51.32,38.25 50.49,39.01 50.7,40.56 49.38,39.69 49.53,38.68 47.91,40.74 45.37,40.23 46.04,43.26 45.05,44.09 45.08,48.26 43.29,50.53 42.27,49.98 42.19,51.32 39.91,51.33 39.51,55.82 37.58,57.73 35.6,57.98 35.28,60.5 30.92,63.89 27.72,63.96 27.95,64.97 25.92,67.33 25.72,68.86 23.67,65.67 22.64,65.64 20.12,66.19 16.2,69.62 14.12,69.79 12.38,72.71 13.25,75.57 12.0,77.62 13.95,79.72 18.71,78.35 20.32,77.01 20.82,75.64 20.05,74.28 21.03,72.91 24.23,72.84 26.11,74.8 28.08,74.51 31.53,75.92 34.3,79.81 33.97,82.08 35.02,84.28 37.17,85.57 38.81,82.16 42.03,82.05 42.28,80.42 43.71,79.69 43.28,75.89 41.27,76.16 42.47,75.57 40.4,75.44 43.05,74.01 42.42,72.76 43.29,71.63 44.93,71.35 43.58,70.46 52.4,65.66 51.04,67.25 49.33,66.64 47.93,70.78 46.64,71.65 46.38,70.26 43.64,70.4 53.79,64.26 56.9,65.47 58.45,62.9 57.59,62.3 57.52,60.43 59.06,59.33 58.99,56.87 61.49,56.24 61.72,55.43 63.07,58.06 65.07,56.66 65.18,57.43 67.86,56.79 69.79,57.49 71.81,56.47 72.96,56.81 73.79,55.06 75.25,54.42 80.0,54.45 83.08,54.79 85.29,56.96 85.34,58.17 86.88,57.94 86.29,56.99 88.0,55.75 87.65,54.71"
        fill="none"
        stroke="var(--color-red)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
