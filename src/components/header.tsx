'use client';

import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { ArrowDown, ArrowUpRight, Close, Eye, MapPin, Menu } from './icons';
import { profile } from '@/lib/portfolio';

const links = [
  { n: '01', href: '#top', label: 'Overview' },
  { n: '02', href: '#work', label: 'Selected work' },
  { n: '03', href: '#experience', label: 'Experience' },
  { n: '04', href: '#expertise', label: 'Toolkit' },
  { n: '05', href: '#about', label: 'About' },
  { n: '06', href: '#contact', label: 'Contact' },
  { n: '07', href: '/open-to-work', label: 'Open to work' },
];

export function Header({ resume }: { resume: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="profile-sidebar">
      <div className="sidebar-inner">
        <p className="sidebar-name">{profile.name}</p>
        <p className="sidebar-role">{profile.role}</p>
        <ul className="sidebar-tags" aria-label="Focus areas">
          {profile.focus.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="sidebar-loc">
          <MapPin size={13} />
          {profile.location}
        </span>
        <hr className="sidebar-divider" />
        <span className="sidebar-label">Explore</span>
        <nav className="sidebar-nav" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              <span className="n">{l.n}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-foot">
          <span className="years">5+ years building backends</span>
          <div className="sidebar-social">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={12} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="sidebar-theme">
            <span>Appearance</span>
            <ThemeToggle />
          </div>
          <span className="sidebar-copy">© 2026 Mohammed Shahid</span>
        </div>
      </div>
      <div className="mobile-header">
        <a href="#top" className="mobile-brand" aria-label="Mohammed Shahid — overview">
          <span className="ms" aria-hidden="true">ms</span>
          Mohammed Shahid
        </a>
        <div className="mobile-actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            ref={menuRef}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={`mobile-nav${open ? ' open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span className="n">{l.n}</span>
              {l.label}
            </a>
          ))}
          <div className="mobile-resume-actions">
            <a href={resume} className="resume-mobile" download aria-label="Download résumé" onClick={() => setOpen(false)}>
              <ArrowDown size={15} />
              Résumé
            </a>
            <a
              href={resume}
              className="resume-mobile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview résumé (opens PDF in a new tab)"
              onClick={() => setOpen(false)}
            >
              <Eye size={15} />
              Preview
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
