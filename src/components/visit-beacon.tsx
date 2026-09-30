'use client';

import { useEffect } from 'react';

export function VisitBeacon() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('visit-notified')) return;
      sessionStorage.setItem('visit-notified', '1');

      const body = JSON.stringify({
        path: window.location.pathname,
        screen: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer,
        colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      });

      fetch('/api/notify-visit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }, []);

  return null;
}
