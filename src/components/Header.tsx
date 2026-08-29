'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from './Container';
import { Wordmark } from './Wordmark';
import { buttonClass } from './ui';
import { mainNav, siteConfig } from '@/config/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <Container width="wide">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${siteConfig.name} — home`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`label px-3 py-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-red'
                    : 'text-paper hover:text-red-bright'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className={`${buttonClass('primary', 'md')} ml-3`}
            >
              Join the list
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="label flex items-center gap-2 border border-line px-3 py-2.5 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-ink lg:hidden"
      >
        <Container width="wide">
          <nav aria-label="Main, mobile" className="flex flex-col py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`border-b border-line-soft py-4 font-display text-2xl font-bold ${
                  isActive(item.href) ? 'text-red' : 'text-paper'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/submit-event"
              onClick={() => setOpen(false)}
              className="border-b border-line-soft py-4 font-display text-2xl font-bold text-paper"
            >
              Submit an event
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setOpen(false)}
              className={`${buttonClass('primary', 'lg')} mt-6`}
            >
              Join the list
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
