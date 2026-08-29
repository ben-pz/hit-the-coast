'use client';

import { useId, useState } from 'react';
import { buttonClass } from './ui';
import { newsletterConfig, newsletterConnected } from '@/config/site';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'notice'; message: string }
  | { kind: 'error'; message: string };

/**
 * Signup form.
 *
 * Progressive enhancement: the <form> has a real `action` and `method`, so it
 * still subscribes people if JavaScript fails — the browser just navigates to
 * Kit's confirmation page. When JS is available we intercept, post in the
 * background and keep the visitor on the page.
 *
 * With no form ID configured it submits nothing and says so.
 */
export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const introId = useId();
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const dark = tone === 'dark';
  const fieldClass = dark
    ? 'border-line bg-ink-800 text-paper placeholder:text-mute/70'
    : 'border-paper-line bg-paper text-ink placeholder:text-mute-dark/70';
  const helpClass = dark ? 'text-mute' : 'text-mute-dark';

  const action = newsletterConnected
    ? newsletterConfig.endpoint(newsletterConfig.kitFormId)
    : undefined;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const address = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setStatus({
        kind: 'error',
        message: 'That does not look like an email address. Have another go.',
      });
      return;
    }

    if (!consent) {
      setStatus({
        kind: 'error',
        message: 'Please tick the box to confirm you are happy to hear from us.',
      });
      return;
    }

    if (!action) {
      setStatus({
        kind: 'notice',
        message:
          'The mailing list is not connected yet, so your address has not been stored. Nothing was sent anywhere.',
      });
      return;
    }

    setStatus({ kind: 'submitting' });

    try {
      const body = new FormData();
      body.append(newsletterConfig.emailField, address);

      const response = await fetch(action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus({
        kind: 'success',
        message:
          'You’re in. Check your inbox — there’s a confirmation email to click before we can send you anything.',
      });
      setEmail('');
      setConsent(false);
    } catch {
      setStatus({
        kind: 'error',
        message:
          'We could not reach the mailing list just then. Try again in a moment.',
      });
    }
  }

  const statusStyles = {
    success: dark ? 'border-red text-paper' : 'border-red-deep text-ink',
    notice: dark ? 'border-mute text-mute' : 'border-mute-dark text-mute-dark',
    error: dark ? 'border-red text-red-bright' : 'border-red-deep text-red-deep',
  } as const;

  const showStatus =
    status.kind === 'success' ||
    status.kind === 'notice' ||
    status.kind === 'error';

  return (
    <form
      action={action}
      method="post"
      onSubmit={handleSubmit}
      noValidate
      className="w-full"
    >
      <p id={introId} className={`mb-6 text-sm leading-relaxed ${helpClass}`}>
        {newsletterConfig.consentCopy}
      </p>

      <div>
        <label htmlFor={emailId} className={`label block ${helpClass}`}>
          Email address
        </label>
        <input
          id={emailId}
          name={newsletterConfig.emailField}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-describedby={introId}
          className={`mt-2 w-full border px-4 py-3 font-sans text-base outline-none ${fieldClass}`}
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#e64a33]"
        />
        <label
          htmlFor={consentId}
          className={`text-sm leading-relaxed ${helpClass}`}
        >
          Yes, email me the newsletter. I can unsubscribe at any time.
        </label>
      </div>

      <button
        type="submit"
        disabled={status.kind === 'submitting'}
        className={`${buttonClass(dark ? 'primary' : 'onPaper', 'lg')} mt-6 w-full sm:w-auto`}
      >
        {status.kind === 'submitting' ? 'Sending…' : 'Join the movement'}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={
          showStatus
            ? `mt-5 border-l-2 py-1 pl-4 text-sm ${statusStyles[status.kind as 'success' | 'notice' | 'error']}`
            : 'sr-only'
        }
      >
        {status.kind === 'submitting' ? 'Sending your details…' : null}
        {showStatus ? (status as { message: string }).message : null}
      </p>

      {!newsletterConnected ? (
        <p className={`mt-5 text-xs leading-relaxed ${helpClass}`}>
          <strong className="font-semibold">Heads up:</strong> no mailing list is
          connected yet, so this form cannot store your address. Paste a Kit form
          ID into <code className="font-mono">kitFormId</code> in{' '}
          <code className="font-mono">src/config/site.ts</code> to switch it on.
        </p>
      ) : null}
    </form>
  );
}
