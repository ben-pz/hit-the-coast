import { Callout } from './ui';

/**
 * Shown on every routes page. Deliberately short — long safety copy gets
 * skipped, and the point is that conditions change and we cannot know yours.
 */
export function ResponsibleRunning({
  tone = 'dark',
}: {
  tone?: 'dark' | 'light';
}) {
  return (
    <Callout title="Run this coast responsibly" tone={tone}>
      <p>
        No route on this site is safe in all conditions. Coastal paths run beside
        unfenced cliffs, cross tidal ground, and change with erosion, weather and
        works. Sections close, sometimes at short notice.
      </p>
      <p>
        Before you set off: check the tide times, check the forecast and the wind
        direction, check for path closures and diversions with the National
        Trails site and the local authority, tell someone your route and expected
        finish time, and turn back if the conditions are not what you planned
        for. Distances, ascent and facilities here are indicative, not surveyed.
      </p>
    </Callout>
  );
}
