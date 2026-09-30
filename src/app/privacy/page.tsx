import Link from 'next/link';
import type { Metadata } from 'next';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft } from '@/components/icons';
import { profile } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Privacy notice | Mohammed Shahid',
  description:
    'How this portfolio handles visitor information: what is collected automatically, what is stored in your browser, and which third parties are involved.',
};

const sections = [
  {
    title: 'What this site collects automatically',
    body: [
      'When a page on this site is opened, a single notification per browser session is sent to the site owner via a private Telegram bot. The notification contains the technical details any website receives with a request: your IP address, approximate location (city/region/country, as provided by the hosting platform), the page visited, the site you came from (referrer), your browser and operating system (user agent), language, timezone, and screen and window size.',
      'This is used for one purpose only: so the owner knows the site is being visited and from what kind of device and location. It is not used for advertising, profiling, or tracking you across other sites, and it is not sold or shared with anyone else.',
    ],
  },
  {
    title: 'Cookies and browser storage',
    body: [
      'This site sets no tracking cookies. It uses your browser’s local/session storage for preferences and to avoid duplicates: your light/dark theme choice, whether you dismissed the “open to work” notice, and a flag so the visit notification fires once per session instead of on every page load. Except for the visit notification described above, nothing in this storage is transmitted anywhere.',
    ],
  },
  {
    title: 'Information you choose to share',
    body: [
      'If you contact the owner by email, phone, WhatsApp, LinkedIn, or GitHub, the information in that conversation is used only to reply to you and is governed by those services’ own privacy policies. No information from those services is read or stored by this site.',
    ],
  },
  {
    title: 'Third parties involved',
    body: [
      'Vercel — hosts this site and may log requests under its own policies.',
      'Telegram — delivers the visit notification described above; message content passes through Telegram’s servers.',
      'GitHub, LinkedIn, WhatsApp, and your email provider — only involved if you choose to use the links to contact the owner.',
      'This site loads no third-party analytics, advertising, fonts, or trackers. Fonts are served from the same site, and there are no remote scripts or images.',
    ],
  },
  {
    title: 'Retention and your choices',
    body: [
      'Visitor notifications are brief and kept only in the owner’s private Telegram. If you would like any data that may relate to you removed, or you have questions about this notice, email the owner and the request will be honoured where feasible. This notice may be updated as the site changes; the current version is always available on this page.',
    ],
  },
] as const;

export default function Privacy() {
  return (
    <div className="otw-shell">
      <div className="otw-topbar">
        <Link href="/" className="otw-back">
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
        <div className="otw-topbar-right">
          <span className="otw-topbar-name">Mohammed Shahid</span>
          <ThemeToggle />
        </div>
      </div>
      <main id="main" className="otw-main">
        <section className="otw-hero">
          <h1>Privacy notice</h1>
          <p className="otw-summary">
            A short, plain-language note on what this portfolio collects and why.
          </p>
        </section>
        {sections.map((s) => (
          <section className="section" key={s.title}>
            <h2 className="privacy-h">{s.title}</h2>
            {s.body.map((p) => (
              <p className="privacy-p" key={p.slice(0, 32)}>
                {p}
              </p>
            ))}
          </section>
        ))}
        <section className="section">
          <h2 className="privacy-h">Questions</h2>
          <p className="privacy-p">
            Email <a href={`mailto:${profile.email}`} className="privacy-mail">{profile.email}</a> with
            any questions or requests about data.
          </p>
        </section>
        <footer className="site-footer">
          <div className="footer-inner">
            <span className="footer-id">
              Mohammed Shahid
              <span className="role">Backend engineering</span>
            </span>
            <Link href="/" className="back-top">
              Back to portfolio <ArrowLeft size={14} />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
