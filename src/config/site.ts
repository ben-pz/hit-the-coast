/**
 * Central site configuration.
 *
 * Rename the site, change navigation, contact details or social links here —
 * nothing else in the codebase hard-codes these values.
 *
 * PLACEHOLDER values are marked. Replace them before launch.
 */

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/** Social profiles. Empty until real accounts exist — see the note below. */
const social: SocialLink[] = [];

export const siteConfig = {
  /** Change this one value to rename the site. */
  name: 'Hit the Coast',
  /** Club name. */
  clubName: 'PZ×RC',
  /**
   * How the site relates to the club, shown under the wordmark.
   * The cross is U+00D7 (×), not U+2715 (✕) — only U+00D7 exists in Archivo,
   * Inter and JetBrains Mono, so U+2715 would render in a fallback font and
   * break the lockup. Change both together if you ever swap the typefaces.
   */
  clubRelation: 'In association with',
  /** Used in page titles: "<page> | Hit the Coast" */
  titleSuffix: 'Hit the Coast',
  tagline: 'Run it. Track it. Complete it.',
  description:
    'Track every mile of England’s coast path you have run. 45 point-to-point segments in Cornwall to start, with the rest of England to follow — plus coastal races, club runs and honest writing, in association with PZ×RC.',
  /** The live domain. */
  url: 'https://hitthecoast.com',
  locale: 'en_GB',
  /**
   * Set these up free with Cloudflare Email Routing (your domain → Email →
   * Email Routing) and forward them to an inbox you already read.
   */
  email: {
    general: 'hello@hitthecoast.com',
    events: 'events@hitthecoast.com',
    press: 'press@hitthecoast.com',
  },
  /**
   * No accounts yet, so nothing is shown. When you make one, add it here and
   * it appears in the footer and in the site's structured data:
   *
   *   { label: 'Instagram', href: 'https://instagram.com/hitthecoast', handle: '@hitthecoast' },
   *
   * Only ever list a profile that exists — a dead link is worse than no link.
   */
  social,
  basedIn: 'Penzance, Cornwall',
} as const;

export const mainNav = [
  { label: 'The Coast', href: '/coast' },
  { label: 'Events', href: '/events' },
  { label: 'Routes', href: '/routes' },
  { label: 'Stories & Gear', href: '/stories' },
  { label: 'About', href: '/about' },
] as const;

export const footerNav = [
  {
    heading: 'Discover',
    links: [
      { label: 'Track the coast', href: '/coast' },
      { label: 'Coastal events', href: '/events' },
      { label: 'Cornish routes', href: '/routes' },
      { label: 'Stories & gear', href: '/stories' },
    ],
  },
  {
    heading: 'Get involved',
    links: [
      { label: 'Join the newsletter', href: '/newsletter' },
      { label: 'Submit an event', href: '/submit-event' },
      { label: 'About us', href: '/about' },
    ],
  },
] as const;

/**
 * Newsletter wiring — Kit (formerly ConvertKit).
 *
 * ── HOW TO GO LIVE (about five minutes) ─────────────────────────────────────
 *
 *   1. Create a free Kit account. The free tier covers 10,000 subscribers with
 *      unlimited sends.
 *   2. Create a form in Kit (any style — we only use its endpoint, not its
 *      markup).
 *   3. Open that form in Kit. Its URL ends in a number, e.g.
 *        https://app.kit.com/forms/designers/8391234/edit
 *      That number — 8391234 — is your form ID.
 *   4. Paste it into `kitFormId` below and redeploy.
 *
 * Until a form ID is set, the signup form deliberately tells visitors that the
 * list is not connected and that nothing was stored. It does not pretend.
 *
 * Because the form posts straight to Kit from the browser, there is no server,
 * no API key in this repo, and nothing secret to leak. The form ID is public by
 * design — it is the same value Kit puts in its own embed code.
 *
 * Using a different provider? Beehiiv, MailerLite and Brevo all accept a plain
 * form POST too; change `endpoint` and `emailField` to match their docs.
 */
export const newsletterConfig = {
  /** PLACEHOLDER — paste your Kit form ID here to switch the list on. */
  kitFormId:'9859527',

  /** Kit's public form-submission endpoint. `app.convertkit.com` also works. */
  endpoint: (formId: string) =>
    `https://app.kit.com/forms/${formId}/subscriptions`,

  /** The field name Kit expects. */
  emailField: 'email_address',

  /** Shown above the form so nobody is misled about where their address goes. */
  consentCopy:
    'One email a month or so: new coastal events, routes worth the drive, and the odd honest kit review. No spam, unsubscribe in one click.',
} as const;

/** True only when a real form ID is configured. Drives the honesty notice. */
export const newsletterConnected = newsletterConfig.kitFormId.trim().length > 0;

export type SiteConfig = typeof siteConfig;
