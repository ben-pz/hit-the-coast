/**
 * Tips left against coast segments.
 *
 * ── WHY TIPS COME FIRST ─────────────────────────────────────────────────────
 *
 * Of the three things people might leave on a segment — a rating, a review, a
 * tip — only the tip is useful the moment ONE person writes it. A single rating
 * is noise until dozens exist. A review is someone's afternoon. But "the lower
 * car park floods on a spring tide, use the one at the top" is worth the whole
 * page on its own, forever, to everyone who reads it.
 *
 * Tips are also the only one of the three that works with no backend: they are
 * few, they are permanent, and they benefit from being checked before they go
 * up. So they ship now as reviewed content, and ratings and reviews wait for
 * accounts. See docs/ROADMAP.md.
 *
 * ── HOW A TIP GETS HERE ─────────────────────────────────────────────────────
 *
 * Someone sends one from a segment page (a mailto, same as event submission),
 * you sanity-check it against what you know, and you add it below with their
 * first name. That is the whole loop. It is manual on purpose: the value of
 * this page is that everything on it is true, and at this size you can hold
 * that line by reading every one.
 *
 * Set `verified: true` once you have confirmed a tip yourself or trust the
 * person who sent it. Unverified tips still show, badged — a warning from a
 * stranger is better than no warning, as long as nobody is misled about where
 * it came from.
 */

export const tipCategories = [
  'Parking',
  'Transport',
  'Tides',
  'Terrain',
  'Water & food',
  'Access',
  'Safety',
] as const;

export type TipCategory = (typeof tipCategories)[number];

export type SegmentTip = {
  id: string;
  /** Matches a `CoastSegment.id` in coast-segments.ts. */
  segmentId: string;
  category: TipCategory;
  text: string;
  /** First name only, as submitted. No accounts yet, so no profiles to link. */
  author: string;
  /** ISO date the tip was added to the site. */
  added: string;
  /**
   * SAMPLE DATA FLAG — same rule as events and routes.
   *
   * Everything below is illustrative, written to show the format and to make
   * the layout real. None of it has been checked on the ground. Delete these
   * the moment you have genuine tips from people who have run the segment.
   */
  verified: boolean;
};

export const segmentTips: SegmentTip[] = [
  {
    id: 'tip-hayle-st-ives-parking',
    segmentId: 'hayle-st-ives',
    category: 'Transport',
    text: 'Both ends are on the railway line, so this is the one segment you can do without a car or a lift. Park at Lelant Saltings if you are driving and take the branch line back.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-st-ives-zennor-time',
    segmentId: 'st-ives-pendeen-1',
    category: 'Terrain',
    text: 'Whatever time you think this will take, add an hour. The boulders between Pen Enys and Zennor Head are a scramble, not a run, and they are slower again in the wet.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-st-ives-zennor-bus',
    segmentId: 'st-ives-pendeen-1',
    category: 'Transport',
    text: 'The bus back from Zennor is infrequent and stops early. Check the last one before you set off, or you are walking the lane back in the dark.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-newquay-holywell-gannel',
    segmentId: 'newquay-perranporth-1',
    category: 'Tides',
    text: 'The Gannel crossing decides this one. There is a seasonal footbridge and a tidal crossing, and around high water neither is an option — you go inland and add a couple of miles.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-portreath-godrevy-water',
    segmentId: 'portreath-hayle-1',
    category: 'Water & food',
    text: 'Nothing at all between Portreath and Godrevy. It is exposed the whole way and there is no shade, so carry more than the distance suggests.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-lizard-cadgwith-serpentine',
    segmentId: 'lizard-coverack-1',
    category: 'Safety',
    text: 'The serpentine rock here goes like glass in the wet. It looks like ordinary rock and it is not — take the steps down to Cadgwith slowly.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-helford-ferry',
    segmentId: 'helford-falmouth',
    category: 'Access',
    text: 'The Helford ferry is seasonal and weather-dependent. If it is not running there is no easy way round — it is a long detour inland. Ring ahead.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-falmouth-portscatho-ferries',
    segmentId: 'falmouth-portloe-1',
    category: 'Access',
    text: 'Two ferries in one segment — St Mawes then Place. Both are seasonal. Getting this one wrong is how a nine-mile morning becomes a very long afternoon.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-port-isaac-polzeath-parking',
    segmentId: 'port-isaac-padstow-1',
    category: 'Parking',
    text: 'Port Isaac parking is up the hill above the village, not in it. The descent to the harbour at the start is steeper than it looks on the way back.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-polzeath-padstow-ferry',
    segmentId: 'port-isaac-padstow-2',
    category: 'Tides',
    text: 'The Rock to Padstow ferry runs from a different jetty at low water, and there is a long walk across the sand to reach it. Allow for that at the end.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-marsland-bude-remote',
    segmentId: 'marsland-bude',
    category: 'Safety',
    text: 'No phone signal in the valleys and no way off the path for most of it. Tell someone your plan. This is the most committing segment in Cornwall.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
  {
    id: 'tip-boscastle-tintagel-short',
    segmentId: 'crackington-tintagel-2',
    category: 'Parking',
    text: 'Boscastle has a big car park by the harbour and buses to Tintagel, which makes this a rare four-miler you can do one-way without two cars.',
    author: 'Sample tip',
    added: '2026-08-29',
    verified: false,
  },
];

export function tipsForSegment(segmentId: string): SegmentTip[] {
  return segmentTips.filter((tip) => tip.segmentId === segmentId);
}

export function tipCountFor(segmentId: string): number {
  return tipsForSegment(segmentId).length;
}

export const totalTips = segmentTips.length;
