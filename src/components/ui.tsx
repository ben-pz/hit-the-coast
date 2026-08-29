import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/* ------------------------------------------------------------------ Button */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'onPaper';
type ButtonSize = 'md' | 'lg';

const buttonBase =
  'inline-flex items-center justify-center gap-2 font-display font-bold tracking-tight ' +
  'transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none';

const buttonVariants: Record<ButtonVariant, string> = {
  // Ink text on red: ~5.4:1 contrast.
  primary: 'bg-red text-ink hover:bg-red-bright',
  secondary:
    'border border-line text-paper hover:border-red hover:text-red-bright',
  ghost: 'text-paper hover:text-red-bright underline underline-offset-4',
  onPaper: 'bg-ink text-paper hover:bg-red hover:text-ink',
};

const buttonSizes: Record<ButtonSize, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
) {
  return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${buttonClass(variant, size)} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${buttonClass(variant, size)} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------------- Tag */

export function Tag({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'red' | 'quiet' | 'paper';
}) {
  const tones = {
    default: 'border-line text-mute',
    red: 'border-red/60 text-red-bright',
    quiet: 'border-line-soft text-mute',
    paper: 'border-paper-line text-mute-dark',
  } as const;

  return (
    <span
      className={`label inline-flex items-center border px-2 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- SectionHeader */

export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  tone = 'dark',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: { label: string; href: string };
  tone?: 'dark' | 'light';
}) {
  const introColour = tone === 'dark' ? 'text-mute' : 'text-mute-dark';
  const rule = tone === 'dark' ? 'bg-line' : 'bg-paper-line';
  const linkColour =
    tone === 'dark'
      ? 'text-red-bright hover:text-paper'
      : 'text-red-deep hover:text-ink';

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="label text-red">{eyebrow}</span>
        <span className={`h-px flex-1 ${rule}`} aria-hidden="true" />
      </div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          {intro ? (
            <p className={`mt-3 max-w-2xl text-base ${introColour}`}>{intro}</p>
          ) : null}
        </div>
        {action ? (
          <Link
            href={action.href}
            className={`label shrink-0 whitespace-nowrap ${linkColour}`}
          >
            {action.label} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- DataList */

/** Waymarker-style key/value rows used for route and event specifics. */
export function DataList({
  items,
  tone = 'dark',
}: {
  items: { label: string; value: ReactNode }[];
  tone?: 'dark' | 'light';
}) {
  const divider = tone === 'dark' ? 'divide-line' : 'divide-paper-line';
  const labelColour = tone === 'dark' ? 'text-mute' : 'text-mute-dark';

  return (
    <dl className={`divide-y ${divider} border-y ${divider === 'divide-line' ? 'border-line' : 'border-paper-line'}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-baseline justify-between gap-6 py-3"
        >
          <dt className={`label ${labelColour}`}>{item.label}</dt>
          <dd className="text-right font-mono text-sm">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------ Callout note */

export function Callout({
  title,
  children,
  tone = 'dark',
}: {
  title: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
}) {
  const shell =
    tone === 'dark'
      ? 'border-line bg-ink-800 text-mute'
      : 'border-paper-line bg-paper-dim text-mute-dark';

  return (
    <aside className={`border-l-2 border-l-red border-y border-r p-5 ${shell}`}>
      <p className="label mb-2 text-red">{title}</p>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </aside>
  );
}

/* --------------------------------------------------- Unverified data badge */

export function SampleBadge({ label = 'Unverified sample' }: { label?: string }) {
  return (
    <span
      className="label inline-flex items-center gap-1.5 border border-dashed border-mute/50 px-2 py-1 text-mute"
      title="Sample content created to demonstrate the layout. Details have not been confirmed with an organiser."
    >
      <span aria-hidden="true">◇</span>
      {label}
    </span>
  );
}
