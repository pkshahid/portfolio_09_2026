'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy } from './icons';

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2000);
  }

  return (
    <span className="copy-email">
      <button type="button" className="copy-btn" onClick={copy}>
        <Copy />
        Copy email
      </button>
      <span className="copy-state" role="status" aria-live="polite">
        {state === 'copied' ? 'Email copied' : state === 'failed' ? 'Couldn’t copy. Use the email link.' : ''}
      </span>
    </span>
  );
}
