/**
 * Generates the placeholder artwork used across the site.
 *
 * Every image is an abstract contour-map drawing derived deterministically from
 * its filename, so the same slug always produces the same picture. They exist
 * so the layouts read correctly before real photography is commissioned.
 *
 * REPLACE THESE. Drop a real photograph at the same path (any web format) and
 * update the `image` field in the matching entry in src/data/*.ts.
 *
 *   node scripts/generate-placeholder-art.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const INK = '#0d0f13';
const LAND = '#14171d';
const LINE = '#f4f1ec';
const RED = '#e64a33';

/** Small deterministic PRNG (mulberry32) seeded from a string. */
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 800;

function coastPath(rnd, offset, amplitude, phases) {
  const points = [];
  for (let y = -700; y <= H + 700; y += 20) {
    const t = y / H;
    let x = W * 0.52 + offset;
    x += Math.sin(t * Math.PI * 2 * phases[0] + phases[3]) * amplitude;
    x += Math.sin(t * Math.PI * 2 * phases[1] + phases[4]) * amplitude * 0.45;
    x += Math.sin(t * Math.PI * 2 * phases[2] + phases[5]) * amplitude * 0.22;
    points.push([x, y]);
  }
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
}

/**
 * @param {string} slug
 * @param {{ boost?: number }} [options] `boost` raises line contrast for the
 *   large brand images, which sit behind headlines rather than inside cards.
 */
function build(slug, options = {}) {
  const boost = options.boost ?? 1;
  const rnd = seeded(slug);
  const phases = [
    0.7 + rnd() * 0.9,
    1.6 + rnd() * 1.4,
    3.1 + rnd() * 2.2,
    rnd() * 6.28,
    rnd() * 6.28,
    rnd() * 6.28,
  ];
  const amplitude = 45 + rnd() * 95;
  const rotate = -34 + rnd() * 68;
  const contourCount = 7 + Math.floor(rnd() * 6);
  const contourGap = 18 + rnd() * 14;
  const flip = rnd() > 0.5 ? -1 : 1;
  const dash = [
    `${(10 + rnd() * 10).toFixed(0)} ${(7 + rnd() * 7).toFixed(0)}`,
    '0',
  ][rnd() > 0.72 ? 1 : 0];

  const contours = [];
  for (let i = 1; i <= contourCount; i += 1) {
    const d = coastPath(rnd, -i * contourGap, amplitude * (1 - i * 0.045), phases);
    const opacity = Math.min(0.85, (0.3 - i * 0.017) * boost).toFixed(3);
    contours.push(
      `<path d="${d}" fill="none" stroke="${LINE}" stroke-opacity="${opacity}" stroke-width="${Math.max(0.7, (1.7 - i * 0.07) * Math.min(1.5, boost)).toFixed(2)}"/>`,
    );
  }

  const shore = coastPath(rnd, 0, amplitude, phases);
  const landFill = `${shore} L-900 ${H + 900} L-900 -900 Z`;
  const route = coastPath(rnd, 24 + rnd() * 26, amplitude * 0.96, phases);

  // Fine hatching on the seaward side, fading out to the open sea.
  const hatch = [];
  for (let y = -800; y <= H + 800; y += 14) {
    hatch.push(
      `<line x1="-900" y1="${y}" x2="${W + 900}" y2="${y}" stroke="${LINE}" stroke-opacity="${(0.11 * boost).toFixed(3)}" stroke-width="1"/>`,
    );
  }

  // Rocky shoreline stipple, hugging the coast.
  const stipple = [];
  for (let i = 0; i < 200; i += 1) {
    const y = -500 + rnd() * (H + 1000);
    const t = y / H;
    let x = W * 0.52;
    x += Math.sin(t * Math.PI * 2 * phases[0] + phases[3]) * amplitude;
    x += Math.sin(t * Math.PI * 2 * phases[1] + phases[4]) * amplitude * 0.45;
    x += Math.sin(t * Math.PI * 2 * phases[2] + phases[5]) * amplitude * 0.22;
    x -= 4 + rnd() * 60;
    stipple.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rnd() * 1.6).toFixed(2)}" fill="${LINE}" fill-opacity="${(0.1 + rnd() * 0.22).toFixed(2)}"/>`,
    );
  }

  const markerY = 120 + rnd() * (H - 240);
  const markerT = markerY / H;
  let markerX = W * 0.52 + 24;
  markerX += Math.sin(markerT * Math.PI * 2 * phases[0] + phases[3]) * amplitude * 0.96;
  markerX += Math.sin(markerT * Math.PI * 2 * phases[1] + phases[4]) * amplitude * 0.43;
  markerX += Math.sin(markerT * Math.PI * 2 * phases[2] + phases[5]) * amplitude * 0.21;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Abstract coastal contour map placeholder">
  <defs>
    <clipPath id="seaClip"><path d="${shore} L${W + 900} ${H + 900} L${W + 900} -900 Z"/></clipPath>
    <linearGradient id="seaFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="0.55" stop-color="#fff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="seaMask"><rect x="-900" y="-900" width="${W + 1800}" height="${H + 1800}" fill="url(#seaFade)"/></mask>
    <linearGradient id="vignette" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${INK}" stop-opacity="0"/>
      <stop offset="1" stop-color="${INK}" stop-opacity="${(0.66 / boost).toFixed(2)}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <g transform="translate(${W / 2} ${H / 2}) rotate(${rotate.toFixed(2)}) scale(${(flip * 1.3).toFixed(2)} 1.3) translate(${-W / 2} ${-H / 2})">
    <g clip-path="url(#seaClip)" mask="url(#seaMask)">${hatch.join('')}</g>
    <path d="${landFill}" fill="${LAND}"/>
    ${contours.join('')}
    ${stipple.join('')}
    <path d="${shore}" fill="none" stroke="${LINE}" stroke-opacity="${Math.min(0.9, 0.5 * boost).toFixed(2)}" stroke-width="${(2.4 * Math.min(1.4, boost)).toFixed(1)}"/>
    <path d="${route}" fill="none" stroke="${RED}" stroke-opacity="0.95" stroke-width="3.2" stroke-dasharray="${dash}" stroke-linecap="round"/>
    <circle cx="${markerX.toFixed(0)}" cy="${markerY.toFixed(0)}" r="7" fill="${RED}"/>
    <circle cx="${markerX.toFixed(0)}" cy="${markerY.toFixed(0)}" r="16" fill="none" stroke="${RED}" stroke-opacity="0.55" stroke-width="2"/>
  </g>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>
`;
}

const targets = [
  ['events', [
    'lizard-point-coastal-30',
    'penwith-ultra-100k',
    'pzx-thursday-harbour-loop',
    'st-agnes-sunrise-social',
    'jurassic-cliffs-marathon',
    'exmoor-sea-to-sky-45k',
    'seven-sisters-half',
    'northumberland-castles-50',
    'norfolk-saltmarsh-20',
    'yorkshire-cinder-track-10k',
    'cumbria-estuary-weekender',
    'somerset-levels-coastal-16k',
  ]],
  ['routes', [
    'lands-end-to-sennen-and-back',
    'st-ives-to-zennor',
    'mounts-bay-marazion-loop',
    'cape-cornwall-tin-coast-loop',
    'lizard-point-kynance-loop',
    'seven-sisters-cuckmere-loop',
  ]],
  ['stories', [
    'england-coast-path-what-it-means-for-runners',
    'how-pzx-wasters-started',
    'first-coast-path-run-nine-things',
    'penwith-ultra-race-report',
    'trail-shoes-for-cornish-granite',
    'st-ives-to-zennor-route-guide',
  ]],
  ['brand', ['hero-coast-path-runner', 'about-club-portrait', 'newsletter-cove']],
];

/** Brand images sit behind headlines, so they carry more line contrast. */
const BOOSTED = new Set(['brand']);

let count = 0;
for (const [folder, slugs] of targets) {
  const dir = join(root, 'public', 'images', folder);
  mkdirSync(dir, { recursive: true });
  for (const slug of slugs) {
    const boost = BOOSTED.has(folder) ? 2.1 : 1;
    writeFileSync(join(dir, `${slug}.svg`), build(slug, { boost }), 'utf8');
    count += 1;
  }
}

console.log(`Generated ${count} placeholder images.`);
