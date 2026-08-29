/**
 * The English coast, broken into runnable point-to-point segments.
 *
 * ── HOW THIS IS STRUCTURED ──────────────────────────────────────────────────
 *
 * The source of truth is `stages` — the South West Coast Path Association's own
 * published stage list, trimmed to the Cornish portion of the National Trail
 * (Marsland Mouth on the Devon border, round Land's End, to the Tamar at
 * Cremyll). Their stages are walking days of 9–14 miles.
 *
 * Most stages are then split once, at a real intermediate place with parking
 * and usually a bus, to give runner-sized half days. `coastSegments` is derived
 * from that, so:
 *
 *   - a stage's parts always sum to its published distance — the totals stay
 *     sourced even though the split within a stage is our estimate;
 *   - every segment records the `officialStage` it came from, so anyone who has
 *     walked the Trail can map their history onto it;
 *   - changing a split means editing one line, not renumbering a list.
 *
 * Stages left whole are the ones with no good access point near the middle —
 * the remote north coast, the ferry-dependent crossings — or that are already
 * short. That is where the mixture of half days and full days comes from, and
 * it is decided by the ground rather than by wanting a tidy list.
 *
 * ── DISTANCES: WHAT IS SOURCED AND WHAT IS NOT ──────────────────────────────
 *
 *   'official'    — the Association's published stage distance, unchanged.
 *   'approximate' — a stage that straddles the county border, where the
 *                   Association does not publish the Cornish split.
 *   'split'       — one half of an official stage. The pair sums to the
 *                   official figure; where the halfway point falls is our
 *                   estimate until real geometry exists.
 *
 * ── WHAT IS STILL MISSING ───────────────────────────────────────────────────
 *
 * No coordinates and no route geometry. Those must come from the National Trail
 * GPX or OS Open Data, never from an estimate: a GPX either covers a segment or
 * it does not, and a guessed line would silently pass or fail real runs. Until
 * then this supports manual ticking only.
 *
 * ── ADDING THE REST OF ENGLAND ──────────────────────────────────────────────
 *
 * Add the region to `coastRegions` with `status: 'live'`, then add its stages
 * below with that `region`. Nothing else changes — the tracker, the totals and
 * the page all read from this file.
 */

/* ------------------------------------------------------------------ regions */

export type CoastRegion = {
  id: string;
  name: string;
  /** 'live' regions are trackable; 'planned' ones are listed as coming. */
  status: 'live' | 'planned';
  /** Shown on the planned regions so the ambition is legible. */
  blurb?: string;
};

export const coastRegions: CoastRegion[] = [
  { id: 'cornwall', name: 'Cornwall', status: 'live' },
  {
    id: 'devon',
    name: 'Devon',
    status: 'planned',
    blurb: 'Both coasts — Hartland to the Tamar, and Plymouth round to Lyme.',
  },
  {
    id: 'dorset',
    name: 'Dorset & the Jurassic Coast',
    status: 'planned',
    blurb: 'Lyme Regis to South Haven Point, the end of the South West Coast Path.',
  },
  {
    id: 'somerset',
    name: 'Somerset & the Bristol Channel',
    status: 'planned',
  },
  { id: 'south-east', name: 'Sussex, Kent & the South East', status: 'planned' },
  { id: 'east-anglia', name: 'East Anglia', status: 'planned' },
  { id: 'yorkshire', name: 'Yorkshire & Lincolnshire', status: 'planned' },
  { id: 'north-east', name: 'Northumberland & the North East', status: 'planned' },
  { id: 'north-west', name: 'Cumbria & the North West', status: 'planned' },
];

export const coastAreas = [
  'North Cornwall',
  'The Atlantic Coast',
  'West Penwith',
  'Mount’s Bay & the Lizard',
  'The Fal & the Roseland',
  'South East Cornwall',
] as const;

export type CoastArea = (typeof coastAreas)[number];

/* ------------------------------------------------------------------- stages */

type Stage = {
  id: string;
  start: string;
  end: string;
  region: string;
  area: CoastArea;
  miles: number;
  source: 'official' | 'approximate';
  note?: string;
  /**
   * Split this stage in two at a real intermediate place.
   * `firstMiles` is our estimate; the second half is whatever is left, so the
   * pair always sums to the official stage distance.
   */
  splitAt?: { place: string; firstMiles: number; note?: string; endNote?: string };
};

const stages: Stage[] = [
  // ── North Cornwall ───────────────────────────────────────────────────────
  {
    id: 'marsland-bude',
    start: 'Marsland Mouth',
    end: 'Bude',
    region: 'cornwall',
    area: 'North Cornwall',
    miles: 10,
    source: 'approximate',
    note: 'The Cornish half of the official Hartland Quay to Bude stage. Remote, relentless, and left whole because there is no sensible way off it in the middle.',
  },
  {
    id: 'bude-crackington',
    start: 'Bude',
    end: 'Crackington Haven',
    region: 'cornwall',
    area: 'North Cornwall',
    miles: 10,
    source: 'official',
    note: 'Big cliffs, and High Cliff — the highest point on the Cornish coast.',
  },
  {
    id: 'crackington-tintagel',
    start: 'Crackington Haven',
    end: 'Tintagel',
    region: 'cornwall',
    area: 'North Cornwall',
    miles: 11,
    source: 'official',
    splitAt: {
      place: 'Boscastle',
      firstMiles: 7,
      endNote: 'Harbour, car park and buses at Boscastle.',
    },
  },
  {
    id: 'tintagel-port-isaac',
    start: 'Tintagel',
    end: 'Port Isaac',
    region: 'cornwall',
    area: 'North Cornwall',
    miles: 9,
    source: 'official',
  },
  {
    id: 'port-isaac-padstow',
    start: 'Port Isaac',
    end: 'Padstow',
    region: 'cornwall',
    area: 'North Cornwall',
    miles: 12,
    source: 'official',
    splitAt: {
      place: 'Polzeath',
      firstMiles: 7,
      endNote: 'Ends with the Rock to Padstow ferry — check the timetable and the tide.',
    },
  },

  // ── The Atlantic Coast ───────────────────────────────────────────────────
  {
    id: 'padstow-porthcothan',
    start: 'Padstow',
    end: 'Porthcothan',
    region: 'cornwall',
    area: 'The Atlantic Coast',
    miles: 13.5,
    source: 'official',
    splitAt: { place: 'Harlyn Bay', firstMiles: 6.5 },
  },
  {
    id: 'porthcothan-newquay',
    start: 'Porthcothan',
    end: 'Newquay',
    region: 'cornwall',
    area: 'The Atlantic Coast',
    miles: 11,
    source: 'official',
    splitAt: { place: 'Mawgan Porth', firstMiles: 4 },
  },
  {
    id: 'newquay-perranporth',
    start: 'Newquay',
    end: 'Perranporth',
    region: 'cornwall',
    area: 'The Atlantic Coast',
    miles: 11,
    source: 'official',
    splitAt: {
      place: 'Holywell Bay',
      firstMiles: 6,
      note: 'Crosses the Gannel — which crossing you use depends entirely on the tide.',
    },
  },
  {
    id: 'perranporth-portreath',
    start: 'Perranporth',
    end: 'Portreath',
    region: 'cornwall',
    area: 'The Atlantic Coast',
    miles: 12,
    source: 'official',
    splitAt: {
      place: 'St Agnes',
      firstMiles: 7,
      note: 'Past St Agnes Head and the engine houses. Exposed the whole way.',
    },
  },
  {
    id: 'portreath-hayle',
    start: 'Portreath',
    end: 'Hayle',
    region: 'cornwall',
    area: 'The Atlantic Coast',
    miles: 12,
    source: 'official',
    splitAt: {
      place: 'Godrevy',
      firstMiles: 8,
      endNote: 'National Trust car park at Godrevy, seals in the cove below.',
    },
  },
  {
    id: 'hayle-st-ives',
    start: 'Hayle',
    end: 'St Ives',
    region: 'cornwall',
    area: 'The Atlantic Coast',
    miles: 6,
    source: 'official',
    note: 'The shortest segment in Cornwall, and a good first one to tick off.',
  },

  // ── West Penwith ─────────────────────────────────────────────────────────
  {
    id: 'st-ives-pendeen',
    start: 'St Ives',
    end: 'Pendeen',
    region: 'cornwall',
    area: 'West Penwith',
    miles: 14,
    source: 'official',
    splitAt: {
      place: 'Zennor',
      firstMiles: 7,
      note: 'The boulder section. Allow far longer than the distance suggests — two and a half hours is not slow.',
    },
  },
  {
    id: 'pendeen-sennen',
    start: 'Pendeen',
    end: 'Sennen Cove',
    region: 'cornwall',
    area: 'West Penwith',
    miles: 9,
    source: 'official',
    note: 'The Tin Coast, with the engine houses on the cliff below the path.',
  },
  {
    id: 'sennen-lamorna',
    start: 'Sennen Cove',
    end: 'Lamorna',
    region: 'cornwall',
    area: 'West Penwith',
    miles: 12,
    source: 'official',
    splitAt: {
      place: 'Porthcurno',
      firstMiles: 6.5,
      note: 'Round Land’s End itself.',
    },
  },
  {
    id: 'lamorna-marazion',
    start: 'Lamorna',
    end: 'Marazion',
    region: 'cornwall',
    area: 'West Penwith',
    miles: 9,
    source: 'official',
    note: 'Through Mousehole, Newlyn and Penzance. Home ground for the PZX Wasters.',
  },

  // ── Mount’s Bay & the Lizard ─────────────────────────────────────────────
  {
    id: 'marazion-porthleven',
    start: 'Marazion',
    end: 'Porthleven',
    region: 'cornwall',
    area: 'Mount’s Bay & the Lizard',
    miles: 11,
    source: 'official',
    splitAt: { place: 'Praa Sands', firstMiles: 7 },
  },
  {
    id: 'porthleven-lizard',
    start: 'Porthleven',
    end: 'The Lizard',
    region: 'cornwall',
    area: 'Mount’s Bay & the Lizard',
    miles: 13,
    source: 'official',
    splitAt: {
      place: 'Mullion Cove',
      firstMiles: 8,
      note: 'Past Loe Bar.',
      endNote: 'Past Kynance Cove to the most southerly point in England.',
    },
  },
  {
    id: 'lizard-coverack',
    start: 'The Lizard',
    end: 'Coverack',
    region: 'cornwall',
    area: 'Mount’s Bay & the Lizard',
    miles: 11,
    source: 'official',
    splitAt: {
      place: 'Cadgwith',
      firstMiles: 4,
      note: 'Serpentine underfoot — genuinely slippery when wet.',
    },
  },
  {
    id: 'coverack-helford',
    start: 'Coverack',
    end: 'Helford',
    region: 'cornwall',
    area: 'Mount’s Bay & the Lizard',
    miles: 13,
    source: 'official',
    splitAt: {
      place: 'Porthallow',
      firstMiles: 5,
      endNote: 'Porthallow marks the halfway point of the whole South West Coast Path.',
    },
  },

  // ── The Fal & the Roseland ───────────────────────────────────────────────
  {
    id: 'helford-falmouth',
    start: 'Helford',
    end: 'Falmouth',
    region: 'cornwall',
    area: 'The Fal & the Roseland',
    miles: 10,
    source: 'official',
    note: 'Needs the Helford passenger ferry, which is seasonal. Left whole because the crossing decides your day.',
  },
  {
    id: 'falmouth-portloe',
    start: 'Falmouth',
    end: 'Portloe',
    region: 'cornwall',
    area: 'The Fal & the Roseland',
    miles: 14,
    source: 'official',
    splitAt: {
      place: 'Portscatho',
      firstMiles: 9,
      note: 'Includes the St Mawes and Place ferries.',
    },
  },
  {
    id: 'portloe-mevagissey',
    start: 'Portloe',
    end: 'Mevagissey',
    region: 'cornwall',
    area: 'The Fal & the Roseland',
    miles: 12,
    source: 'official',
    splitAt: { place: 'Gorran Haven', firstMiles: 7 },
  },

  // ── South East Cornwall ──────────────────────────────────────────────────
  {
    id: 'mevagissey-par',
    start: 'Mevagissey',
    end: 'Par',
    region: 'cornwall',
    area: 'South East Cornwall',
    miles: 12,
    source: 'official',
    splitAt: { place: 'Charlestown', firstMiles: 8 },
  },
  {
    id: 'par-polperro',
    start: 'Par',
    end: 'Polperro',
    region: 'cornwall',
    area: 'South East Cornwall',
    miles: 13,
    source: 'official',
    splitAt: {
      place: 'Fowey',
      firstMiles: 5,
      endNote: 'Starts with the Polruan ferry.',
    },
  },
  {
    id: 'polperro-portwrinkle',
    start: 'Polperro',
    end: 'Portwrinkle',
    region: 'cornwall',
    area: 'South East Cornwall',
    miles: 12,
    source: 'official',
    splitAt: {
      place: 'Looe',
      firstMiles: 5,
      endNote: 'Looe has a railway station — the easiest segment in Cornwall to reach without a car.',
    },
  },
  {
    id: 'portwrinkle-cremyll',
    start: 'Portwrinkle',
    end: 'Cremyll',
    region: 'cornwall',
    area: 'South East Cornwall',
    miles: 12,
    source: 'approximate',
    splitAt: {
      place: 'Cawsand',
      firstMiles: 8,
      note: 'The Cornish part of the official Portwrinkle to Plymouth stage, round Rame Head.',
      endNote: 'The ferry at Cremyll is where Cornwall ends.',
    },
  },
];

/* ----------------------------------------------------------------- segments */

export type CoastSegment = {
  id: string;
  /** Ordering along the coast, north-east round to south-east. */
  order: number;
  name: string;
  start: string;
  end: string;
  region: string;
  area: CoastArea;
  distanceMiles: number;
  distanceSource: 'official' | 'approximate' | 'split';
  /** The published stage this came from, e.g. "Crackington Haven to Tintagel". */
  officialStage: string;
  note?: string;
  /**
   * Whether this segment may ever carry a timed leaderboard.
   *
   * FALSE EVERYWHERE, DELIBERATELY. Most of this coast is unfenced cliff path,
   * and a fastest-time board rewards running it hard in bad conditions. Only
   * set this true for a segment you personally know to be safe to run flat out
   * — hard surface, no cliff edge, nothing tidal — and never from a map.
   * See docs/ROADMAP.md.
   */
  timedSegment: boolean;
};

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Explicit loop rather than flatMap so the union type stays exact. */
function buildSegments(): CoastSegment[] {
  const out: CoastSegment[] = [];

  for (const stage of stages) {
    const officialStage = `${stage.start} to ${stage.end}`;

    if (!stage.splitAt) {
      out.push({
        id: stage.id,
        order: out.length + 1,
        name: officialStage,
        start: stage.start,
        end: stage.end,
        region: stage.region,
        area: stage.area,
        distanceMiles: stage.miles,
        distanceSource: stage.source,
        officialStage,
        note: stage.note,
        timedSegment: false,
      });
      continue;
    }

    const { place, firstMiles, note, endNote } = stage.splitAt;

    out.push({
      id: `${stage.id}-1`,
      order: out.length + 1,
      name: `${stage.start} to ${place}`,
      start: stage.start,
      end: place,
      region: stage.region,
      area: stage.area,
      distanceMiles: firstMiles,
      distanceSource: 'split',
      officialStage,
      note: note ?? stage.note,
      timedSegment: false,
    });

    out.push({
      id: `${stage.id}-2`,
      order: out.length + 1,
      name: `${place} to ${stage.end}`,
      start: place,
      end: stage.end,
      region: stage.region,
      area: stage.area,
      distanceMiles: round(stage.miles - firstMiles),
      distanceSource: 'split',
      officialStage,
      note: endNote,
      timedSegment: false,
    });
  }

  return out;
}

export const coastSegments: CoastSegment[] = buildSegments();

/* ------------------------------------------------------------------ helpers */

/** Anything up to 7.5 miles reads as a morning; beyond that, a proper day out. */
export const HALF_DAY_LIMIT = 7.5;

export function isHalfDay(segment: CoastSegment): boolean {
  return segment.distanceMiles <= HALF_DAY_LIMIT;
}

export const totalCoastMiles = round(
  coastSegments.reduce((sum, segment) => sum + segment.distanceMiles, 0),
);

export function segmentsByArea(): { area: CoastArea; segments: CoastSegment[] }[] {
  return coastAreas
    .map((area) => ({
      area,
      segments: coastSegments.filter((segment) => segment.area === area),
    }))
    .filter((group) => group.segments.length > 0);
}

export function milesInArea(area: CoastArea): number {
  return round(
    coastSegments
      .filter((segment) => segment.area === area)
      .reduce((sum, segment) => sum + segment.distanceMiles, 0),
  );
}

export function getSegment(id: string): CoastSegment | undefined {
  return coastSegments.find((segment) => segment.id === id);
}

/** The segments either side, for walking the coast page by page. */
export function neighbours(id: string): {
  previous?: CoastSegment;
  next?: CoastSegment;
} {
  const index = coastSegments.findIndex((segment) => segment.id === id);
  if (index === -1) return {};
  return {
    previous: coastSegments[index - 1],
    next: coastSegments[index + 1],
  };
}

/** The other half of a split stage, where there is one. */
export function siblingSegment(segment: CoastSegment): CoastSegment | undefined {
  if (segment.distanceSource !== 'split') return undefined;
  return coastSegments.find(
    (other) =>
      other.officialStage === segment.officialStage && other.id !== segment.id,
  );
}

export const liveRegions = coastRegions.filter((r) => r.status === 'live');
export const plannedRegions = coastRegions.filter((r) => r.status === 'planned');
