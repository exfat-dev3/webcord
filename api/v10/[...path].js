'use strict';

const DISCORD_API = 'https://discord.com/api/v10';

module.exports = async function handler(req, res) {
  if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers['x-bot-token'];
  if (typeof token !== 'string' || !token || token.length > 500) {
    return res.status(401).json({ message: 'Bot token required' });
  }

  try {
    // Vercel's catch-all function receives this endpoint beneath /api/v10/.
    const requestUrl = new URL(req.url, 'https://webcord.invalid');
    const discordPath = requestUrl.pathname.replace(/^\/api\/v10/, '');
    if (!discordPath.startsWith('/') || discordPath.includes('..')) {
      return res.status(400).json({ message: 'Invalid Discord API path' });
    }

    let body;
    if (req.method !== 'GET' && req.method !== 'DELETE' && req.body !== undefined) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const upstream = await fetch(`${DISCORD_API}${discordPath}${requestUrl.search}`, {
      method: req.method,
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    const responseBody = await upstream.text();
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.status(upstream.status).send(responseBody);
  } catch (error) {
    // Do not log request headers or token-bearing data.
    return res.status(502).json({ message: `Discord API relay failed: ${error.message}` });
  }
};
