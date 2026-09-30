import Link from 'next/link';
import { Header } from '@/components/header';
import { OpenToWorkPopup } from '@/components/open-to-work-popup';
import { SectionHeading } from '@/components/section-heading';
import { WorkCard } from '@/components/work-card';
import { CopyEmail } from '@/components/copy-email';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Certificate,
  Eye,
} from '@/components/icons';
import { certifications, expertise, profile, works } from '@/lib/portfolio';

const showOpenToWork = (process.env.OPEN_TO_WORK ?? '').toLowerCase() !== 'false';

export default function Home() {
  return (
    <div className="portfolio-shell">
      <Header resume={profile.resume} />
      <main id="main" className="portfolio-main">
        <section id="top" className="profile-hero" aria-labelledby="profile-title">
          <div className="hero-kicker">
            <Link href="/open-to-work" className="availability">
              Open to backend engineering roles
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <h1 id="profile-title">
            Mohammed<br />Shahid<span className="name-period">.</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-intro">{profile.introduction}</p>
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
          <div className="hero-stack">
            <span>Core stack</span>
            <p>Python <span>/</span> Go <span>/</span> Django <span>/</span> PostgreSQL</p>
          </div>
        </section>

        <section className="evidence-grid" aria-label="Selected engineering outcomes">
          <a className="evidence evidence-featured" href="#query-performance">
            <span className="evidence-label">
              Database performance
              <ArrowUpRight size={16} />
            </span>
            <strong className="evidence-number">
              <span className="before-number">~2 min</span>
              <span className="metric-arrow">→</span>
              5 ms
            </strong>
            <p>A critical query, optimized.</p>
          </a>
          <div className="evidence">
            <span className="evidence-label">Delivery</span>
            <strong className="evidence-number">17+</strong>
            <p>Production applications<br />delivered &amp; maintained</p>
          </div>
          <div className="evidence">
            <span className="evidence-label">Distributed systems</span>
            <strong className="evidence-number">8</strong>
            <p>Microservices built<br />with Python &amp; Go</p>
          </div>
        </section>

        <section className="section" id="work">
          <SectionHeading
            title="Engineering, in practice."
            description="Selected work at Epixel. The problems, my contribution, and the result."
            meta="03 case studies"
          />
          <div className="work-list">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <SectionHeading
            title="From implementation to ownership."
          />
          <div className="xp-head">
            <span className="xp-company">Epixel Solutions Pvt Ltd</span>
            <span className="xp-tenure">Dec 2020 — Present</span>
          </div>
          <div className="xp-timeline">
            <div className="xp-item">
              <span className="xp-role-date">Jan 2024 – Present</span>
              <span className="xp-role-title">Senior Software Engineer</span>
            </div>
            <div className="xp-item">
              <span className="xp-role-date">Dec 2020 – Jan 2024</span>
              <span className="xp-role-title">Junior Software Engineer</span>
            </div>
          </div>
          <div className="xp-points">
            <span className="xp-points-label">Across my time at Epixel</span>
            <ul className="xp-points-list">
            <li>Delivered and maintained backend applications across MLM, e-commerce, CRM, LMS, ticketing, and customer support.</li>
            <li>Managed production infrastructure, deployments, monitoring, and incident response.</li>
            <li>Reviewed code and mentored 3 junior engineers within a 15-developer team.</li>
            <li>Worked directly with clients on requirements, technical design, and releases.</li>
            </ul>
          </div>
          <div className="xp-prior">
            <strong>Electronic Repair Technician</strong>
            <span>CTDI · Sep 2020 – Dec 2020 · Bengaluru, India</span>
          </div>
        </section>

        <section className="section" id="expertise">
          <SectionHeading
            title="A practical backend toolkit."
          />
          <div className="toolkit-grid">
            {expertise.map((group) => (
              <div className="toolkit-card" key={group.number}>
                <span className="toolkit-num">{group.number}</span>
                <h3>{group.title}</h3>
                <p className="toolkit-desc">{group.description}</p>
                <ul className="chips">
                  {group.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <SectionHeading
            title="The person behind the systems."
          />
          <div className="about-copy">
            <p>{profile.about}</p>
            <p>{profile.aboutSecond}</p>
          </div>
          <div className="edu-grid">
            <div>
              <h3>Education</h3>
              <p className="edu-degree" style={{ margin: 0 }}>Diploma in Electronics Engineering</p>
              <p className="edu-meta">SSM Polytechnic College, Tirur · 2017–2020</p>
              <span className="edu-cgpa">CGPA 9.24 / 10</span>
            </div>
            <div>
              <h3>Certifications</h3>
              <ul className="cert-list">
                {certifications.map((c) => (
                  <li key={c}>
                    <Certificate size={16} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="contact-panel">
            <span className="contact-label">Looking for your next backend engineer?</span>
            <h2>Let’s start a conversation.</h2>
            <p className="contact-body">
              I’m exploring backend engineering opportunities. If my experience fits your team, I’d be glad to hear from you.
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
            <span className="footer-note">© 2026 Mohammed Shahid</span>
            <Link href="/privacy" className="footer-privacy">Privacy</Link>
            <a href="#top" className="back-top">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </footer>
      </main>
      {showOpenToWork ? <OpenToWorkPopup /> : null}
    </div>
  );
}
