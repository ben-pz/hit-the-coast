'use client';

import { useId, useState } from 'react';
import { buttonClass } from './ui';
import { newsletterConfig } from '@/config/site';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'notice'; message: string }
  | { kind: 'error'; message: string };

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: 'submitting' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent }),
      });

      const data: { message?: string } = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          kind: 'success',
          message: data.message ?? 'You’re in. Check your inbox to confirm.',
        });
        setEmail('');
        setConsent(false);
        return;
      }

      // 501 = no provider connected. Say so plainly rather than faking success.
      if (response.status === 501) {
        setStatus({
          kind: 'notice',
          message:
            data.message ??
            'The mailing list is not connected yet, so your address has not been stored.',
        });
        return;
      }

      setStatus({
        kind: 'error',
        message: data.message ?? 'Something went wrong. Try again in a moment.',
      });
    } catch {
      setStatus({
        kind: 'error',
        message:
          'Could not reach the server. Check your connection and try again.',
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
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <p id={introId} className={`mb-6 text-sm leading-relaxed ${helpClass}`}>
        {newsletterConfig.consentCopy}
      </p>

      <div>
        <label htmlFor={emailId} className={`label block ${helpClass}`}>
          Email address
        </label>
        <input
          id={emailId}
          name="email"
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

      {!newsletterConfig.providerConnected ? (
        <p className={`mt-5 text-xs leading-relaxed ${helpClass}`}>
          <strong className="font-semibold">Heads up:</strong> no email provider
          is connected yet, so this form cannot store your address. It is wired
          and ready — see{' '}
          <code className="font-mono">src/app/api/newsletter/route.ts</code> for
          the three lines that connect Mailchimp, Kit, Beehiiv or Brevo.
        </p>
      ) : null}
    </form>
  );
}
