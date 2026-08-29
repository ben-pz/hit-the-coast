/**
 * Central site configuration.
 *
 * Rename the site, change navigation, contact details or social links here —
 * nothing else in the codebase hard-codes these values.
 *
 * PLACEHOLDER values are marked. Replace them before launch.
 */

export const siteConfig = {
  /** Change this one value to rename the site. */
  name: 'Hit the Coast',
  /** Club name. */
  clubName: 'PZX Wasters',
  /** Used in page titles: "<page> | Hit the Coast" */
  titleSuffix: 'Hit the Coast',
  tagline: 'Run it. Track it. Complete it.',
  description:
    'Track every mile of England’s coast path you have run. 45 point-to-point segments in Cornwall to start, with the rest of England to follow — plus coastal races, club runs and honest writing from the PZX Wasters.',
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
  /** PLACEHOLDER — replace with real profiles, or delete the ones you don't use. */
  social: [
    { label: 'Instagram', href: 'https://instagram.com/', handle: '@pzxwasters' },
    { label: 'Strava', href: 'https://www.strava.com/', handle: 'PZX Wasters' },
    { label: 'Facebook', href: 'https://facebook.com/', handle: 'PZX Wasters' },
  ],
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
      { label: 'About PZX Wasters', href: '/about' },
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
