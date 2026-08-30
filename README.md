# Hit the Coast — by PZX Wasters

Marketing and directory site for coastal running in England. Next.js 16 (App
Router), TypeScript, Tailwind CSS v4, built as a **static export** — a plain
folder of HTML and assets with no server behind it. No CMS, no database, no
auth; content lives in typed files under `src/data`.

**Run it. Track it. Complete it.** — [hitthecoast.com](https://hitthecoast.com)

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the whole site to ./out
npm run preview    # serve ./out at http://localhost:3000
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run art        # regenerate the placeholder artwork
```

`npm run build` produces `./out`. That folder *is* the website — upload it
anywhere.

## Deploying

Anything that serves static files will host this, free.

**Cloudflare Pages** (recommended — free tier permits commercial use):

1. Push the repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build command `npm run build`, output directory `out`. Leave the rest.
4. Add your domain under Custom domains.

No adapter, no serverless functions, no config file. Pushing to `main`
redeploys.

**Anywhere else:** Netlify (publish directory `out`), GitHub Pages, or literally
drag the `out` folder onto Cloudflare Pages' upload box.

**A note on Vercel:** it works and deploys with zero config, but the free Hobby
plan is restricted to non-commercial use under Vercel's fair-use guidelines.
Once the site earns anything — affiliate income, a sponsored newsletter slot —
that means the $20/month Pro plan. Cloudflare's free tier has no such
restriction, which is why the build targets static output.

## Running costs

| Piece | Service | Cost |
| --- | --- | --- |
| Hosting | Cloudflare Pages free tier | £0 |
| Newsletter | Kit free tier (10,000 subscribers, unlimited sends) | £0 |
| Email `hello@…` | Cloudflare Email Routing → forwards to any inbox | £0 |
| Analytics | Cloudflare Web Analytics (optional) | £0 |
| Domain | `hitthecoast.com` — bought | ~£10/year |

Prices move; check before buying. Avoid registrars whose cheap first year
renews at three times the price.

---

## Where to change things

| What | File |
| --- | --- |
| Site name, tagline, domain, email addresses, social links | `src/config/site.ts` |
| Main and footer navigation | `src/config/site.ts` |
| Newsletter (Kit form ID) | `src/config/site.ts` → `newsletterConfig.kitFormId` |
| Events (check `verified` and `ticketStatus`) | `src/data/events.ts` |
| Routes | `src/data/routes.ts` |
| Articles | `src/data/articles.ts` |
| Regions, event types, distance bands, difficulty | `src/data/taxonomy.ts` |
| Colours, type scale, contour motif | `src/app/globals.css` |

Renaming the site is one string: `siteConfig.name`. `siteConfig.titleSuffix`
controls the `<title>` suffix on every page.

---

## Honesty rules baked into the build

These are deliberate. Do not "fix" them by making the UI more optimistic.

- **The newsletter stores nothing until you connect it.** With no `kitFormId`
  set, the form validates and then tells the visitor plainly that the list is
  not connected and nothing was stored. Paste a Kit form ID into
  `src/config/site.ts` and it starts working; every "not live yet" notice on
  the site removes itself. The form posts straight to Kit from the browser, so
  there is no server and no API key in this repo — the form ID is public by
  design, the same value Kit puts in its own embed code. The `<form>` carries a
  real `action` and `method`, so it still subscribes people if JavaScript
  fails.
- **Event submission has no backend.** The form on `/submit-event` composes a
  structured email and opens the visitor's mail client. It tells them nothing
  was stored.
- **All seed content is flagged.** Every event and route carries
  `verified: false` and renders an "Unverified sample" badge. Set it to `true`
  only once details are confirmed with the organiser.
- **No `Event` structured data yet.** `src/components/StructuredData.tsx`
  publishes only `Organization` and `WebSite`, so unverified listings do not
  reach search results as confirmed facts. Enable the Event graph when
  listings are verified.
- **No affiliate links.** Gear reviews are designed to carry a disclosure
  banner (`article.containsAffiliateLinks`) and product blocks have `link:
  null`. Nothing fake is shipped.

---

## Placeholders to replace before launch

1. ~~**Domain**~~ — done: `hitthecoast.com`, set in `siteConfig.url`.
2. **Email addresses** — `siteConfig.email.*` are set to `@hitthecoast.com` but
   the mailboxes do not exist yet. Set them up free with Cloudflare Email
   Routing (your domain → Email → Email Routing) forwarding to an inbox you
   already read.
3. **Kit form ID** — `newsletterConfig.kitFormId`, to switch the list on.
4. ~~**Social links**~~ — done: `siteConfig.social` is empty, so the footer
   shows none. Add a profile there when an account actually exists.
5. **Photography** — every image under `public/images/` is generated
   placeholder artwork (see below). Filenames match their content, so a real
   photograph dropped at the same path needs no code change.
6. **Open Graph image** — `public/og/hit-the-coast-og.png` is generated artwork
   plus type. Regenerate with `python3 scripts/generate-og-image.py`.
7. ~~**Event data**~~ — done: the three events in `src/data/events.ts` were
   checked against the organisers' own pages in August 2026 and carry
   `verified: true`, with the check date in a comment on each. **Route data is
   still sample.** Re-check `ticketStatus` a few times a year — entries open and
   races sell out, and a stale badge is a small lie.
8. ~~**Club run details**~~ — done: there is no club run, and every claim of a
   Thursday club night has been removed.
9. **Maps and GPX** — `/routes/[slug]` has a ready-made map container and a
   disabled GPX button. `gpxUrl` is `null` on every route.

### The placeholder artwork

`scripts/generate-placeholder-art.mjs` draws abstract coastal contour maps,
seeded deterministically from each filename, so the same slug always produces
the same image:

```bash
node scripts/generate-placeholder-art.mjs
```

`scripts/generate-og-image.py` builds the Open Graph image (needs Pillow and
fontTools; it pins the variable fonts to fixed weights in `.font-cache/`).

A static export ships images as-is (`images.unoptimized` in `next.config.ts`),
which suits SVG placeholders exactly. When real photography arrives, export it
at sensible dimensions — roughly 1200px wide for cards, 2000px for the hero —
and compress it to WebP before committing, since nothing will resize it for you.

---

## Structure

```
src/
  app/                    routes (App Router)
    coast/                the tracker — the main feature
    coast/[segment]/      one page per segment: tips now, reviews later
    events/               directory with client-side filters
    routes/[slug]/        route guides
    stories/[slug]/       editorial
    sitemap.ts robots.ts  SEO
  components/             shared UI
  config/site.ts          central configuration
  data/                   typed seed content
  lib/coast-progress.ts   where ticks live — swap for an API when accounts land
  lib/format.ts           date and distance formatting
```

Client components are only where interactivity requires them: the header menu,
the events filters, and the two forms. Everything else is prerendered to HTML
at build time.

---

## Accessibility notes

- Skip link, landmark elements, one `h1` per page, ordered headings.
- Visible 3px focus ring on every interactive element, never removed.
- Mobile menu: `aria-expanded`, `aria-controls`, Escape closes and restores
  focus.
- Filter results and form outcomes announce through `role="status"` /
  `aria-live="polite"`.
- Colour pairs meet WCAG AA: off-white on ink ≈ 16:1, muted text ≈ 8:1, red on
  ink ≈ 4.9:1, and buttons use ink text on red ≈ 5.4:1 rather than white on red
  (which would fail).
- `prefers-reduced-motion` disables transitions and smooth scrolling.

---

## Built to extend, not built yet

Future ideas — including the coast-completion tracking app, and the Strava and
safety constraints found while researching it — are written up in
[`docs/ROADMAP.md`](docs/ROADMAP.md).

The structure supports these without rework: a CMS behind `src/data`, ticketing
or booking on events (`ticketStatus` already exists), disclosed affiliate links
in reviews, featured/paid listings (`featured` already exists), and sponsorship
slots in the newsletter. None of it is implemented, and none of it should crowd
out the content.

---

## Facts about the England Coast Path

Editorial copy refers to the King Charles III England Coast Path. Verified
against GOV.UK and National Trails (August 2026): inaugurated by the King on
19 March 2026 at the Seven Sisters, Sussex; around 2,700 miles when complete;
approximately 2,100 miles open with full access rights at inauguration; work
continuing on the remaining sections. Do not upgrade "officially opened" into
"entirely finished" anywhere on the site.
