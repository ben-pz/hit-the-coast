/**
 * The Cornish coast, broken into point-to-point segments.
 *
 * ── WHERE THIS COMES FROM ───────────────────────────────────────────────────
 *
 * The segment boundaries and distances follow the South West Coast Path
 * Association's own 52-day itinerary for the National Trail, trimmed to the
 * Cornish portion — from the Devon border at Marsland Mouth on the north coast,
 * round Land's End, to the Tamar at Cremyll. Using a published stage list
 * rather than inventing our own boundaries means every segment starts and ends
 * somewhere real, with parking, a bus and usually a pub.
 *
 * Two segments are marked `distanceSource: 'approximate'`: the first and last,
 * because the official stages either side of them straddle the county border
 * and the Association does not publish the split. Everything else is the
 * Association's own published mileage.
 *
 * ── WHAT IS STILL MISSING ───────────────────────────────────────────────────
 *
 * No coordinates and no route geometry. Those have to come from a real source —
 * the National Trail GPX, or OS Open Data — not from an estimate, because the
 * whole point of the tracker is that a GPX either covers a segment or it does
 * not. Until then this dataset supports manual ticking only.
 *
 * Longer segments can be subdivided later (Falmouth to Portloe at 14 miles is a
 * big morning). Keep the official boundaries as the parent set, so anyone who
 * has walked the Trail can map their own history onto it.
 */

export const coastAreas = [
  'North Cornwall',
  'The Atlantic Coast',
  'West Penwith',
  'Mount’s Bay & the Lizard',
  'The Fal & the Roseland',
  'South East Cornwall',
] as const;

export type CoastArea = (typeof coastAreas)[number];

export type CoastSegment = {
  id: string;
  /** Ordering along the coast, north-east round to south-east. */
  order: number;
  name: string;
  start: string;
  end: string;
  area: CoastArea;
  distanceMiles: number;
  /**
   * 'official' — the SWCP Association's published stage distance.
   * 'approximate' — our split of a stage that crosses the county border.
   */
  distanceSource: 'official' | 'approximate';
  /** Anything a runner should know before choosing this one. */
  note?: string;
  /**
   * Whether this segment may ever carry a timed leaderboard.
   *
   * DEFAULTS TO FALSE EVERYWHERE, DELIBERATELY. Most of this coast is unfenced
   * cliff path, and a fastest-time board rewards running it fast in bad
   * conditions. Only set this true for a segment you personally know to be safe
   * to run hard — hard surfaces, no cliff edge, no tidal section — and never
   * from a map. See docs/ROADMAP.md for the reasoning.
   */
  timedSegment: boolean;
};

export const coastSegments: CoastSegment[] = [
  // ── North Cornwall ───────────────────────────────────────────────────────
  {
    id: 'marsland-mouth-bude',
    order: 1,
    name: 'Marsland Mouth to Bude',
    start: 'Marsland Mouth (Devon border)',
    end: 'Bude',
    area: 'North Cornwall',
    distanceMiles: 10,
    distanceSource: 'approximate',
    note: 'The Cornish half of the official Hartland Quay to Bude stage. Remote, relentless and one of the toughest stretches on the whole trail.',
    timedSegment: false,
  },
  {
    id: 'bude-crackington-haven',
    order: 2,
    name: 'Bude to Crackington Haven',
    start: 'Bude',
    end: 'Crackington Haven',
    area: 'North Cornwall',
    distanceMiles: 10,
    distanceSource: 'official',
    note: 'Big cliffs and the highest point on the Cornish coast at High Cliff.',
    timedSegment: false,
  },
  {
    id: 'crackington-haven-tintagel',
    order: 3,
    name: 'Crackington Haven to Tintagel',
    start: 'Crackington Haven',
    end: 'Tintagel',
    area: 'North Cornwall',
    distanceMiles: 11,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'tintagel-port-isaac',
    order: 4,
    name: 'Tintagel to Port Isaac',
    start: 'Tintagel',
    end: 'Port Isaac',
    area: 'North Cornwall',
    distanceMiles: 9,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'port-isaac-padstow',
    order: 5,
    name: 'Port Isaac to Padstow',
    start: 'Port Isaac',
    end: 'Padstow',
    area: 'North Cornwall',
    distanceMiles: 12,
    distanceSource: 'official',
    note: 'Ends with the Rock to Padstow ferry across the Camel — check the timetable and the tide.',
    timedSegment: false,
  },

  // ── The Atlantic Coast ───────────────────────────────────────────────────
  {
    id: 'padstow-porthcothan',
    order: 6,
    name: 'Padstow to Porthcothan',
    start: 'Padstow',
    end: 'Porthcothan',
    area: 'The Atlantic Coast',
    distanceMiles: 13.5,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'porthcothan-newquay',
    order: 7,
    name: 'Porthcothan to Newquay',
    start: 'Porthcothan',
    end: 'Newquay',
    area: 'The Atlantic Coast',
    distanceMiles: 11,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'newquay-perranporth',
    order: 8,
    name: 'Newquay to Perranporth',
    start: 'Newquay',
    end: 'Perranporth',
    area: 'The Atlantic Coast',
    distanceMiles: 11,
    distanceSource: 'official',
    note: 'Crosses the Gannel — the crossing you use depends entirely on the tide.',
    timedSegment: false,
  },
  {
    id: 'perranporth-portreath',
    order: 9,
    name: 'Perranporth to Portreath',
    start: 'Perranporth',
    end: 'Portreath',
    area: 'The Atlantic Coast',
    distanceMiles: 12,
    distanceSource: 'official',
    note: 'Past St Agnes Head and the engine houses. Exposed the whole way.',
    timedSegment: false,
  },
  {
    id: 'portreath-hayle',
    order: 10,
    name: 'Portreath to Hayle',
    start: 'Portreath',
    end: 'Hayle',
    area: 'The Atlantic Coast',
    distanceMiles: 12,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'hayle-st-ives',
    order: 11,
    name: 'Hayle to St Ives',
    start: 'Hayle',
    end: 'St Ives',
    area: 'The Atlantic Coast',
    distanceMiles: 6,
    distanceSource: 'official',
    note: 'The shortest segment in Cornwall, and a good first one to tick off.',
    timedSegment: false,
  },

  // ── West Penwith ─────────────────────────────────────────────────────────
  {
    id: 'st-ives-pendeen',
    order: 12,
    name: 'St Ives to Pendeen',
    start: 'St Ives',
    end: 'Pendeen',
    area: 'West Penwith',
    distanceMiles: 14,
    distanceSource: 'official',
    note: 'Includes the St Ives to Zennor boulder section. Allow far longer than the distance suggests.',
    timedSegment: false,
  },
  {
    id: 'pendeen-sennen-cove',
    order: 13,
    name: 'Pendeen to Sennen Cove',
    start: 'Pendeen',
    end: 'Sennen Cove',
    area: 'West Penwith',
    distanceMiles: 9,
    distanceSource: 'official',
    note: 'The Tin Coast — engine houses on the cliff below the path.',
    timedSegment: false,
  },
  {
    id: 'sennen-cove-lamorna',
    order: 14,
    name: 'Sennen Cove to Lamorna',
    start: 'Sennen Cove',
    end: 'Lamorna',
    area: 'West Penwith',
    distanceMiles: 12,
    distanceSource: 'official',
    note: 'Round Land’s End and the whole southern tip of Penwith.',
    timedSegment: false,
  },
  {
    id: 'lamorna-marazion',
    order: 15,
    name: 'Lamorna to Marazion',
    start: 'Lamorna',
    end: 'Marazion',
    area: 'West Penwith',
    distanceMiles: 9,
    distanceSource: 'official',
    note: 'Through Mousehole and Penzance. Home ground for the PZX Wasters.',
    timedSegment: false,
  },

  // ── Mount’s Bay & the Lizard ─────────────────────────────────────────────
  {
    id: 'marazion-porthleven',
    order: 16,
    name: 'Marazion to Porthleven',
    start: 'Marazion',
    end: 'Porthleven',
    area: 'Mount’s Bay & the Lizard',
    distanceMiles: 11,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'porthleven-the-lizard',
    order: 17,
    name: 'Porthleven to The Lizard',
    start: 'Porthleven',
    end: 'The Lizard',
    area: 'Mount’s Bay & the Lizard',
    distanceMiles: 13,
    distanceSource: 'official',
    note: 'Past Loe Bar and Kynance Cove to the most southerly point in England.',
    timedSegment: false,
  },
  {
    id: 'the-lizard-coverack',
    order: 18,
    name: 'The Lizard to Coverack',
    start: 'The Lizard',
    end: 'Coverack',
    area: 'Mount’s Bay & the Lizard',
    distanceMiles: 11,
    distanceSource: 'official',
    note: 'Serpentine underfoot — genuinely slippery when wet.',
    timedSegment: false,
  },
  {
    id: 'coverack-helford',
    order: 19,
    name: 'Coverack to Helford',
    start: 'Coverack',
    end: 'Helford',
    area: 'Mount’s Bay & the Lizard',
    distanceMiles: 13,
    distanceSource: 'official',
    timedSegment: false,
  },

  // ── The Fal & the Roseland ───────────────────────────────────────────────
  {
    id: 'helford-falmouth',
    order: 20,
    name: 'Helford to Falmouth',
    start: 'Helford',
    end: 'Falmouth',
    area: 'The Fal & the Roseland',
    distanceMiles: 10,
    distanceSource: 'official',
    note: 'Needs the Helford passenger ferry — seasonal, so check before you go.',
    timedSegment: false,
  },
  {
    id: 'falmouth-portloe',
    order: 21,
    name: 'Falmouth to Portloe',
    start: 'Falmouth',
    end: 'Portloe',
    area: 'The Fal & the Roseland',
    distanceMiles: 14,
    distanceSource: 'official',
    note: 'Includes the St Mawes and Place ferries. The longest segment in Cornwall.',
    timedSegment: false,
  },
  {
    id: 'portloe-mevagissey',
    order: 22,
    name: 'Portloe to Mevagissey',
    start: 'Portloe',
    end: 'Mevagissey',
    area: 'The Fal & the Roseland',
    distanceMiles: 12,
    distanceSource: 'official',
    timedSegment: false,
  },

  // ── South East Cornwall ──────────────────────────────────────────────────
  {
    id: 'mevagissey-par',
    order: 23,
    name: 'Mevagissey to Par',
    start: 'Mevagissey',
    end: 'Par',
    area: 'South East Cornwall',
    distanceMiles: 12,
    distanceSource: 'official',
    timedSegment: false,
  },
  {
    id: 'par-polperro',
    order: 24,
    name: 'Par to Polperro',
    start: 'Par',
    end: 'Polperro',
    area: 'South East Cornwall',
    distanceMiles: 13,
    distanceSource: 'official',
    note: 'Through Fowey, with the ferry to Polruan.',
    timedSegment: false,
  },
  {
    id: 'polperro-portwrinkle',
    order: 25,
    name: 'Polperro to Portwrinkle',
    start: 'Polperro',
    end: 'Portwrinkle',
    area: 'South East Cornwall',
    distanceMiles: 12,
    distanceSource: 'official',
    note: 'Crosses the Looe river; Seaton and Downderry on the way.',
    timedSegment: false,
  },
  {
    id: 'portwrinkle-cremyll',
    order: 26,
    name: 'Portwrinkle to Cremyll',
    start: 'Portwrinkle',
    end: 'Cremyll (Tamar)',
    area: 'South East Cornwall',
    distanceMiles: 12,
    distanceSource: 'approximate',
    note: 'The Cornish part of the official Portwrinkle to Plymouth stage, round Rame Head. The ferry at Cremyll is where Cornwall ends.',
    timedSegment: false,
  },
];

/** Total Cornish coast path mileage covered by this segment set. */
export const totalCoastMiles = coastSegments.reduce(
  (sum, segment) => sum + segment.distanceMiles,
  0,
);

export function segmentsByArea(): { area: CoastArea; segments: CoastSegment[] }[] {
  return coastAreas
    .map((area) => ({
      area,
      segments: coastSegments
        .filter((segment) => segment.area === area)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((group) => group.segments.length > 0);
}

export function milesInArea(area: CoastArea): number {
  return coastSegments
    .filter((segment) => segment.area === area)
    .reduce((sum, segment) => sum + segment.distanceMiles, 0);
}
