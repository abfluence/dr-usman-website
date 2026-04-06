// Vercel serverless function — Instagram Graph API proxy
// Environment variables required in Vercel dashboard:
//   IG_USER_ID, LONG_LIVED_TOKEN

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
let cache = { data: null, timestamp: 0 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Serve from cache if fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
    return res.json({ source: 'cache', data: cache.data });
  }

  const token = process.env.LONG_LIVED_TOKEN;
  const userId = process.env.IG_USER_ID;

  if (!token || !userId) {
    return res.status(500).json({ error: 'Missing IG_USER_ID or LONG_LIVED_TOKEN env vars' });
  }

  try {
    const fields = 'id,media_url,thumbnail_url,permalink,caption,timestamp,media_type';
    const url = `https://graph.facebook.com/v22.0/${userId}/media?fields=${fields}&limit=12&access_token=${token}`;

    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok || json.error) {
      return res.status(response.status).json({ error: json?.error?.message || 'Instagram API error' });
    }

    const data = (json.data || []).map(post => {
      const rawUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
      return {
        id: post.id,
        media_type: post.media_type,
        display_url: rawUrl ? '/api/ig-image?url=' + encodeURIComponent(rawUrl) : '',
        permalink: post.permalink,
        caption: post.caption || '',
        timestamp: post.timestamp,
      };
    });

    cache = { data, timestamp: Date.now() };
    res.json({ source: 'api', data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Instagram API' });
  }
}
