import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX = 120;

function clean(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.slice(0, MAX);
}

function parseUA(ua: string): string {
  let browser = 'Unknown browser';
  if (/edg(e|ios|a)?\//i.test(ua)) browser = 'Edge';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/(chrome|crios|crmo)\//i.test(ua)) browser = 'Chrome';
  else if (/safari\//i.test(ua)) browser = 'Safari';

  let os = 'Unknown OS';
  if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/mac os x|macintosh/i.test(ua)) os = 'macOS';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/linux/i.test(ua)) os = 'Linux';

  return `${browser} / ${os}`;
}

export async function POST(req: NextRequest) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    let body: Record<string, unknown> = {};
    try {
      const parsed = await req.json();
      if (parsed && typeof parsed === 'object') body = parsed as Record<string, unknown>;
    } catch {
      body = {};
    }

    const h = req.headers;
    const ip = clean(h.get('x-forwarded-for')?.split(',')[0]?.trim());
    const ua = clean(h.get('user-agent'));
    const headerReferer = clean(h.get('referer'));
    const country = clean(h.get('x-vercel-ip-country'));
    const region = clean(h.get('x-vercel-ip-region'));
    const city = clean(h.get('x-vercel-ip-city'));
    const latitude = clean(h.get('x-vercel-ip-latitude'));
    const longitude = clean(h.get('x-vercel-ip-longitude'));
    const acceptLanguage = clean(h.get('accept-language'));
    const chUa = clean(h.get('sec-ch-ua'));
    const chPlatform = clean(h.get('sec-ch-ua-platform'));
    const chMobile = clean(h.get('sec-ch-ua-mobile'));

    const path = clean(body.path);
    const screen = clean(body.screen);
    const viewport = clean(body.viewport);
    const language = clean(body.language) || acceptLanguage;
    const timezone = clean(body.timezone);
    const referrer = clean(body.referrer) || headerReferer;
    const colorScheme = clean(body.colorScheme);

    const location =
      [city, region, country].filter(Boolean).join(', ') || 'unknown';
    const coords = latitude && longitude ? ` (${latitude}, ${longitude})` : '';
    const clientHints = [chUa, chPlatform, chMobile ? `mobile=${chMobile}` : '']
      .filter(Boolean)
      .join(' | ');

    const lines = [
      'New portfolio visitor',
      `Time: ${new Date().toISOString()}`,
      `IP: ${ip || 'unknown'}`,
      `Location: ${location}${coords}`,
      `Page: ${path || 'unknown'}`,
      `Referrer: ${referrer || 'direct'}`,
      `Screen: ${screen || 'unknown'}`,
      `Viewport: ${viewport || 'unknown'}`,
      `Language: ${language || 'unknown'}`,
      `Timezone: ${timezone || 'unknown'}`,
      `Theme: ${colorScheme || 'unknown'}`,
      `Browser/OS: ${parseUA(ua)}${clientHints ? ` | ${clientHints}` : ''}`,
      `UA: ${ua || 'unknown'}`,
    ];

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
