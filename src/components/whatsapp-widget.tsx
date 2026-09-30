'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Close, WhatsApp } from './icons';
import { whatsapp } from '@/lib/portfolio';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('.wa-suggestion')?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    function onDown(e: PointerEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !launcherRef.current?.contains(t)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <>
      <button
        type="button"
        className="wa-launcher"
        ref={launcherRef}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        aria-expanded={open}
        aria-controls="wa-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <Close size={24} /> : <WhatsApp size={28} />}
      </button>
      {open && (
        <div
          id="wa-panel"
          className="wa-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="wa-title"
          ref={panelRef}
        >
          <div className="wa-head">
            <span className="wa-avatar" aria-hidden="true">MS</span>
            <div className="wa-head-text">
              <h2 id="wa-title">Mohammed Shahid</h2>
              <p>Backend Engineer · WhatsApp</p>
            </div>
            <button
              type="button"
              className="wa-close"
              aria-label="Close WhatsApp chat"
              onClick={close}
            >
              <Close size={16} />
            </button>
          </div>
          <div className="wa-body">
            <div className="wa-msg">
              <span className="wa-msg-from">Mohammed</span>
              {whatsapp.greeting}
            </div>
            <p className="wa-topics">Choose a topic</p>
            <ul className="wa-list">
              {whatsapp.suggestions.map((s) => (
                <li key={s.label}>
                  <a
                    className="wa-suggestion"
                    href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(s.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="wa-foot">
            <a
              className="wa-own"
              href={`https://wa.me/${whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <WhatsApp size={16} />
              Write your own message
            </a>
            <p>Opens WhatsApp in a new tab</p>
          </div>
        </div>
      )}
    </>
  );
}
