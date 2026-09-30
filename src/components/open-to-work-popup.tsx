'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { ArrowUpRight, Close } from './icons';
import { openToWork } from '@/lib/portfolio';

let dismissedFallback = false;

function subscribe(callback: () => void) {
  window.addEventListener('otw-change', callback);
  return () => window.removeEventListener('otw-change', callback);
}

function getSnapshot() {
  if (dismissedFallback) return true;
  try {
    return window.sessionStorage.getItem('otw-dismissed') === '1';
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return true;
}

export function OpenToWorkPopup() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) return null;

  function dismiss() {
    dismissedFallback = true;
    try {
      window.sessionStorage.setItem('otw-dismissed', '1');
    } catch {
      dismissedFallback = true;
    }
    window.dispatchEvent(new Event('otw-change'));
  }

  return (
    <aside className="otw-popup" aria-label="Open to work">
      <div className="otw-status">
        <span className="otw-label">Open to work</span>
        <button type="button" className="otw-close" onClick={dismiss} aria-label="Dismiss open to work notice">
          <Close size={14} />
        </button>
      </div>
      <p className="otw-title">Looking for a new role</p>
      <p className="otw-roles">Senior Backend · Python/Go · AI/LLM</p>
      <p className="otw-meta">{openToWork.availability} · Remote, hybrid, or on-site</p>
      <Link href="/open-to-work" className="btn btn-primary otw-cta">
        Show details
        <ArrowUpRight size={15} />
      </Link>
    </aside>
  );
}
