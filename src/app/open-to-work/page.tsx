import { Fragment } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionHeading } from '@/components/section-heading';
import { ThemeToggle } from '@/components/theme-toggle';
import { CopyEmail } from '@/components/copy-email';
import { ArrowDown, ArrowLeft, ArrowUpRight, Eye } from '@/components/icons';
import { openToWork, profile } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Open to work | Mohammed Shahid',
  description:
    'Roles Mohammed Shahid is open to: Senior Backend Engineer, Backend Engineer (Python/Go), and AI / LLM Engineer.',
};

export default function OpenToWork() {
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
          <span className="availability">
            <span aria-hidden="true" />
            Open to work
          </span>
          <h1>{openToWork.headline}</h1>
          <p className="otw-summary">{openToWork.summary}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={profile.resume} download>
              Download résumé
              <ArrowDown size={16} />
            </a>
            <a
              className="btn btn-outline"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview résumé (opens PDF in a new tab)"
            >
              Preview résumé
              <Eye size={16} />
            </a>
            <a className="btn btn-outline" href="#contact">
              Get in touch
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <dl className="otw-facts">
          <div className="otw-fact">
            <dt>Availability</dt>
            <dd>{openToWork.availability}</dd>
          </div>
          <div className="otw-fact">
            <dt>Employment</dt>
            <dd>{openToWork.employment.join(' · ')}</dd>
          </div>
          <div className="otw-fact">
            <dt>Work mode</dt>
            <dd>
              {openToWork.workModes.map((m, i) => (
                <Fragment key={m}>
                  {i > 0 ? ' · ' : ''}
                  <span style={{ whiteSpace: 'nowrap' }}>{m}</span>
                </Fragment>
              ))}
            </dd>
          </div>
          <div className="otw-fact">
            <dt>Location</dt>
            <dd>
              {profile.location}
              <span className="otw-fact-sub">{openToWork.relocation}</span>
            </dd>
          </div>
        </dl>

        <section className="section">
          <SectionHeading title="Roles I’m targeting." />
          <div className="otw-roles-list">
            {openToWork.roles.map((role, i) => (
              <article className="otw-role-card" key={role.title}>
                <span className="otw-role-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{role.title}</h3>
                <p className="otw-role-desc">{role.description}</p>
                <ul className="chips">
                  {role.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading title="What I bring." />
          <ul className="xp-points-list otw-highlights">
            {openToWork.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <Link href="/#work" className="otw-seework">
            See selected work
            <ArrowUpRight size={14} />
          </Link>
        </section>

        <section className="section" id="contact">
          <div className="contact-panel">
            <span className="contact-label">Hiring for one of these roles?</span>
            <h2>Let’s talk.</h2>
            <p className="contact-body">
              Share the role and team, and I’ll get back to you.
            </p>
            <div className="contact-actions">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <div className="contact-links">
              <a href={profile.resume} download>
                Download résumé <ArrowDown size={13} />
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                Preview résumé <Eye size={13} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={13} />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={13} />
              </a>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-inner">
            <span className="footer-id">
              Mohammed Shahid
              <span className="role">Backend engineering</span>
            </span>
            <Link href="/privacy" className="footer-privacy">Privacy</Link>
            <Link href="/" className="back-top">
              Back to portfolio <ArrowLeft size={14} />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
