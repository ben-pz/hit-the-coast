import Link from 'next/link';
import { Container } from './Container';
import { Wordmark } from './Wordmark';
import { ButtonLink } from './ui';
import { footerNav, siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-ink">
      <Container width="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div>
            <Wordmark size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              {siteConfig.tagline} Coastal races, club runs, routes and stories,
              starting in {siteConfig.basedIn.split(', ')[1]}.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-mute hover:text-red-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="label text-red">{group.heading}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper hover:text-red-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="label text-red">The newsletter</h2>
            <p className="mt-5 text-sm leading-relaxed text-mute">
              New coastal events, routes worth the drive, and the odd honest kit
              review. About once a month, and never anything else.
            </p>
            <ButtonLink href="/newsletter" className="mt-6 w-full sm:w-auto">
              Join the list
            </ButtonLink>
            <p className="mt-4 text-xs leading-relaxed text-mute">
              No email provider is connected yet, so the form cannot store your
              address — it says so rather than pretending.
            </p>
          </div>
        </div>

        <div className="border-t border-line py-8">
          <p className="max-w-3xl text-xs leading-relaxed text-mute">
            <strong className="font-semibold text-paper">
              About the content on this site.
            </strong>{' '}
            Events, routes and some articles are currently sample entries,
            clearly marked, created to demonstrate the layout ahead of launch.
            Always check event details with the organiser and current conditions
            with local authorities before you travel or run. Facts about the King
            Charles III England Coast Path are taken from GOV.UK, Natural England
            and National Trails.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-mute">
              © {year} {siteConfig.clubName}. Made on the coast, usually in the
              wind.
            </p>
            <p className="text-xs text-mute">
              <a
                href={`mailto:${siteConfig.email.general}`}
                className="hover:text-red-bright"
              >
                {siteConfig.email.general}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
