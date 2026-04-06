// Vercel serverless function — Instagram image proxy
// Fetches Instagram CDN images server-side to avoid IP-restricted URLs
// failing when loaded directly from visitor browsers.

const ALLOWED_HOSTS = ['cdninstagram.com', 'fbcdn.net'];

function isAllowed(url) {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_HOSTS.some(h => hostname === h || hostname.endsWith('.' + h));
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { url } = req.query;

  if (!url || !isAllowed(url)) {
    return res.status(400).json({ error: 'Invalid or disallowed URL' });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(upstream.status).end();
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');

    const buffer = await upstream.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch {
    res.status(502).end();
  }
}
