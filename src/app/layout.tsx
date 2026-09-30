import type { Metadata } from 'next';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './globals.css';
import { VisitBeacon } from '@/components/visit-beacon';
import { WhatsAppWidget } from '@/components/whatsapp-widget';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammedshahid.in'),
  title: 'Mohammed Shahid | Senior Software Engineer',
  description:
    'Senior Software Engineer specializing in backend systems with Python, Go, PostgreSQL, Docker, microservices, and distributed systems.',
  alternates: { canonical: '/' },
};

const themeInit = `var t;try{t=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=t==='dark'?'dark':'light';`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <WhatsAppWidget />
        <VisitBeacon />
      </body>
    </html>
  );
}
