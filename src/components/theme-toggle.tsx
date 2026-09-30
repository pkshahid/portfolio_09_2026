'use client';

import { Moon, Sun } from './icons';

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      return;
    }
  }

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle} title="Toggle color theme">
      <span className="ic-sun"><Sun /><span className="sr-only">Switch to light theme</span></span>
      <span className="ic-moon"><Moon /><span className="sr-only">Switch to dark theme</span></span>
    </button>
  );
}
