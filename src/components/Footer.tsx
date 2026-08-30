import Link from 'next/link';
import { Container } from './Container';
import { Wordmark } from './Wordmark';
import { ButtonLink } from './ui';
import { footerNav, newsletterConnected, siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-ink">
      <Container width="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div>
            <Wordmark size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              {siteConfig.tagline} Every mile of England’s coast path you have
              run, tracked — starting in {siteConfig.basedIn.split(', ')[1]}.
            </p>
            {siteConfig.social.length > 0 ? (
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
            ) : null}
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
              Sign up and you get an account on the coast tracker the moment
              they exist, plus one email a month with new segments and routes.
            </p>
            <ButtonLink href="/newsletter" className="mt-6 w-full sm:w-auto">
              Take part
            </ButtonLink>
            {!newsletterConnected ? (
              <p className="mt-4 text-xs leading-relaxed text-mute">
                No mailing list is connected yet, so the form cannot store your
                address — it says so rather than pretending.
              </p>
            ) : null}
          </div>
        </div>

        <div className="border-t border-line py-8">
          <p className="max-w-3xl text-xs leading-relaxed text-mute">
            <strong className="font-semibold text-paper">
              About the content on this site.
            </strong>{' '}
            Event listings are checked against the organiser&rsquo;s own page
            before they go up, and dated in the source. Routes and some articles
            are still clearly marked sample entries. Always check event details
            with the organiser, and current conditions with local authorities,
            before you travel or run. Facts about the King Charles III England
            Coast Path are taken from GOV.UK, Natural England and National
            Trails.
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
