# Coastal Running — by PZX Wasters

Marketing and directory site for coastal running in England. Next.js 16 (App
Router), TypeScript, Tailwind CSS v4. No CMS, no database, no auth — content
lives in typed files under `src/data`.

**Run the edge of England.**

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npx tsc --noEmit   # type-check
```

Deploys to Vercel with no configuration.

---

## Where to change things

| What | File |
| --- | --- |
| Site name, tagline, domain, email addresses, social links | `src/config/site.ts` |
| Main and footer navigation | `src/config/site.ts` |
| Newsletter provider wiring | `src/app/api/newsletter/route.ts` |
| Events | `src/data/events.ts` |
| Routes | `src/data/routes.ts` |
| Articles | `src/data/articles.ts` |
| Regions, event types, distance bands, difficulty | `src/data/taxonomy.ts` |
| Colours, type scale, contour motif | `src/app/globals.css` |

Renaming the site is one string: `siteConfig.name`. `siteConfig.titleSuffix`
controls the `<title>` suffix on every page.

---

## Honesty rules baked into the build

These are deliberate. Do not "fix" them by making the UI more optimistic.

- **The newsletter does not store anything.** `/api/newsletter` validates the
  address and returns `501`. The UI says the list is not live yet. See the
  comment at the top of that file for the exact change to connect Mailchimp,
  Kit, Beehiiv or Brevo, then set `newsletterConfig.providerConnected` to
  `true`.
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

1. **Domain** — `siteConfig.url` is `coastalrunning.example.com`. Needed for
   canonical URLs, Open Graph and the sitemap.
2. **Email addresses** — `siteConfig.email.*` are all `example.com`.
3. **Social links** — `siteConfig.social` point at bare profile URLs.
4. **Photography** — every image under `public/images/` is generated
   placeholder artwork (see below). Filenames match their content, so a real
   photograph dropped at the same path needs no code change.
5. **Open Graph image** — `public/og/coastal-running-og.png` is generated
   artwork plus type.
6. **Event and route data** — all sample; nothing has been confirmed with an
   organiser.
7. **Club run details** — the Thursday time and meeting point on `/about` are
   placeholders.
8. **Maps and GPX** — `/routes/[slug]` has a ready-made map container and a
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

Because these are SVGs, `next.config.ts` enables `dangerouslyAllowSVG` with a
restrictive CSP and `contentDispositionType: 'attachment'`. Once real
photography replaces them, that whole `images` block can be deleted.

---

## Structure

```
src/
  app/                    routes (App Router)
    api/newsletter/       the one server endpoint
    events/               directory with client-side filters
    routes/[slug]/        route guides
    stories/[slug]/       editorial
    sitemap.ts robots.ts  SEO
  components/             shared UI
  config/site.ts          central configuration
  data/                   typed seed content
  lib/format.ts           date and distance formatting
```

Client components are only where interactivity requires them: the header menu,
the events filters, and the two forms. Everything else is a server component.

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
