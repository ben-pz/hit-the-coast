import { NextResponse } from 'next/server';

/**
 * Newsletter subscription endpoint.
 *
 * ── HOW TO CONNECT A PROVIDER ───────────────────────────────────────────────
 *
 * Nothing is stored today. This handler validates the address and then returns
 * 501 Not Implemented, and the UI tells the visitor plainly that the list is
 * not live yet. That is deliberate: we do not want to show a success message
 * for an address that went nowhere.
 *
 * To connect a provider:
 *
 *   1. Add the provider's credentials to your environment (e.g. in Vercel):
 *        NEWSLETTER_API_KEY=...
 *        NEWSLETTER_LIST_ID=...
 *   2. Replace the `return notImplemented()` line below with a fetch to your
 *      provider. Reference endpoints:
 *        Mailchimp  POST https://<dc>.api.mailchimp.com/3.0/lists/<listId>/members
 *        Kit        POST https://api.kit.com/v4/forms/<formId>/subscribers
 *        Beehiiv    POST https://api.beehiiv.com/v2/publications/<id>/subscriptions
 *        Brevo      POST https://api.brevo.com/v3/contacts
 *   3. Set `newsletterConfig.providerConnected` to true in src/config/site.ts
 *      so the UI stops warning that the list is not live.
 *
 * Keep the API key server-side only — never expose it with a NEXT_PUBLIC_ prefix.
 */

/** Deliberately simple: catches typos without rejecting valid odd addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function notImplemented() {
  return NextResponse.json(
    {
      ok: false,
      code: 'not_configured',
      message:
        'The mailing list is not connected yet, so your address has not been stored.',
    },
    { status: 501 },
  );
}

export async function POST(request: Request) {
  let email: unknown;
  let consent: unknown;

  try {
    const body = await request.json();
    email = body?.email;
    consent = body?.consent;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'bad_request', message: 'Could not read that request.' },
      { status: 400 },
    );
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      {
        ok: false,
        code: 'invalid_email',
        message: 'That does not look like an email address. Have another go.',
      },
      { status: 422 },
    );
  }

  if (consent !== true) {
    return NextResponse.json(
      {
        ok: false,
        code: 'consent_required',
        message: 'Please tick the box to confirm you are happy to hear from us.',
      },
      { status: 422 },
    );
  }

  // ── Replace this line with your provider call. ──
  return notImplemented();
}
