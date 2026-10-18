import http from 'node:http';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const projectId = process.env.MANUS_PROJECT_ID || process.env.MANUS_WEBDEV_PROJECT_ID || '';
const oauthPortal = process.env.MANUS_OAUTH_PORTAL_URL || '';
const oauthApi = process.env.MANUS_OAUTH_API_URL || '';
const jwtSecret = process.env.MANUS_JWT_SECRET || '';
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function base64Url(value) {
  return Buffer.from(value).toString('base64').replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}
function base64UrlJson(value) { return base64Url(JSON.stringify(value)); }
function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map(part => part.trim().split('='))
    .filter(([key, value]) => key && value !== undefined)
    .map(([key, value]) => [key, decodeURIComponent(value)]));
}
function cookieFlags(req, maxAge = 60 * 60 * 8) {
  const forwarded = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const host = String(req.headers.host || '');
  const publicHttps = forwarded === 'https' || (!host.startsWith('localhost') && !host.startsWith('127.0.0.1'));
  return `Path=/; HttpOnly; SameSite=${publicHttps ? 'None' : 'Lax'}${publicHttps ? '; Secure' : ''}; Max-Age=${maxAge}`;
}
function clearCookieFlags(req) { return cookieFlags(req, 0); }
function requestOrigin(req) {
  const forwarded = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const forwardedHost = String(req.headers['x-forwarded-host'] || req.headers['x-original-host'] || '').split(',')[0].trim();
  const host = forwardedHost || req.headers.host || 'localhost';
  const protocol = forwarded || (String(host).startsWith('localhost') || String(host).startsWith('127.0.0.1') ? 'http' : 'https');
  return `${protocol}://${host}`;
}
function signJwt(payload) {
  const header = base64UrlJson({ alg: 'HS256', typ: 'JWT' });
  const body = base64UrlJson(payload);
  const signature = createHmac('sha256', jwtSecret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}
function verifyJwt(token) {
  if (!jwtSecret || !token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const expected = createHmac('sha256', jwtSecret).update(`${parts[0]}.${parts[1]}`).digest();
  const supplied = Buffer.from(parts[2], 'base64url');
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    if (payload.exp && Number(payload.exp) < Math.floor(Date.now() / 1000)) return null;
    if (payload.appId && projectId && payload.appId !== projectId) return null;
    if (!payload.openId && !payload.sub) return null;
    return payload;
  } catch { return null; }
}
function currentUser(req) {
  const token = parseCookies(req.headers.cookie).webdev_app_session;
  const payload = verifyJwt(token);
  if (!payload) return null;
  return { openId: payload.openId || payload.sub, name: payload.name || payload.email || 'Teacher', email: payload.email || '' };
}
function sendJson(res, status, data, extraHeaders = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...securityHeaders(), ...extraHeaders });
  res.end(JSON.stringify(data));
}
function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self' https://*.manus.computer"
  };
}
async function readJson(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw || '{}');
}
async function exchangeCode(code, redirectUri) {
  const response = await fetch(`${oauthApi}/webdev.v1.WebDevAuthPublicService/ExchangeToken`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId: projectId, grantType: 'authorization_code', code, redirectUri })
  });
  if (!response.ok) throw new Error(`OAuth exchange failed (${response.status})`);
  return response.json();
}
async function getUserInfo(accessToken) {
  const response = await fetch(`${oauthApi}/webdev.v1.WebDevAuthPublicService/GetUserInfo`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken })
  });
  if (!response.ok) throw new Error(`OAuth identity lookup failed (${response.status})`);
  return response.json();
}
function oauthState(nonce, redirectUri) { return base64UrlJson({ redirectUri, nonce }); }
function authConfigured() { return Boolean(projectId && oauthPortal && oauthApi && jwtSecret); }

async function handleApi(req, res, url) {
  if (url.pathname === '/_app/health' && req.method === 'GET') {
    sendJson(res, 200, { ok: true, service: 'benni-teacher-assistant' });
    return true;
  }
  if (url.pathname === '/api/auth/config' && req.method === 'GET') {
    sendJson(res, 200, { configured: authConfigured(), provider: 'Manus OAuth', signup: 'Use the Manus account sign-up flow', localMode: process.env.NODE_ENV !== 'production' });
    return true;
  }
  if (url.pathname === '/api/auth/me' && req.method === 'GET') {
    const user = currentUser(req);
    if (!user) { sendJson(res, 401, { authenticated: false }); return true; }
    sendJson(res, 200, { authenticated: true, user });
    return true;
  }
  if (url.pathname === '/api/auth/login' && req.method === 'GET') {
    if (!authConfigured()) { sendJson(res, 503, { error: 'Authentication is not configured on this project yet.' }); return true; }
    const nonce = randomBytes(24).toString('hex');
    const redirectUri = `${requestOrigin(req)}/manus-oauth/callback`;
    const state = oauthState(nonce, redirectUri);
    const portal = new URL(`${oauthPortal.replace(/\/$/, '')}/app-auth`);
    portal.searchParams.set('appId', projectId);
    portal.searchParams.set('redirectUri', redirectUri);
    portal.searchParams.set('state', state);
    portal.searchParams.set('responseType', 'code');
    res.writeHead(302, { Location: portal.toString(), 'Set-Cookie': `oauth_state=${encodeURIComponent(nonce)}; ${cookieFlags(req, 600)}`, ...securityHeaders() });
    res.end();
    return true;
  }
  if (url.pathname === '/api/auth/logout' && req.method === 'POST') {
    res.writeHead(204, { 'Set-Cookie': `webdev_app_session=; ${clearCookieFlags(req)}`, ...securityHeaders() });
    res.end();
    return true;
  }
  return false;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, requestOrigin(req));
    if (await handleApi(req, res, url)) return;

    if (url.pathname === '/manus-oauth/callback' && req.method === 'GET') {
      const configured = authConfigured();
      const suppliedState = url.searchParams.get('state') || '';
      const code = url.searchParams.get('code') || '';
      const cookies = parseCookies(req.headers.cookie);
      let statePayload = null;
      try { statePayload = JSON.parse(Buffer.from(suppliedState, 'base64url').toString('utf8')); } catch {}
      const expectedRedirectUri = `${requestOrigin(req)}/manus-oauth/callback`;
      const redirectUri = statePayload?.redirectUri === expectedRedirectUri ? statePayload.redirectUri : expectedRedirectUri;
      const expectedNonce = Buffer.from(statePayload?.nonce || '');
      const suppliedNonce = Buffer.from(cookies.oauth_state || '');
      const stateOk = configured && statePayload?.redirectUri === expectedRedirectUri && expectedNonce.length > 0 && expectedNonce.length === suppliedNonce.length && timingSafeEqual(expectedNonce, suppliedNonce);
      if (!stateOk || !code) {
        res.writeHead(302, { Location: '/?auth=failed', 'Set-Cookie': `oauth_state=; ${clearCookieFlags(req)}`, ...securityHeaders() }); res.end(); return;
      }
      try {
        const token = await exchangeCode(code, redirectUri);
        const info = await getUserInfo(token.accessToken);
        const openId = info.openId || info.sub;
        if (!openId) throw new Error('No user identity returned');
        const session = signJwt({ appId: projectId, openId, name: info.name || info.email || 'Teacher', email: info.email || '', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 });
        res.writeHead(302, { Location: '/', 'Set-Cookie': [`webdev_app_session=${encodeURIComponent(session)}; ${cookieFlags(req)}`, `oauth_state=; ${clearCookieFlags(req)}`], ...securityHeaders() }); res.end();
      } catch (error) {
        console.error(error);
        res.writeHead(302, { Location: '/?auth=failed', 'Set-Cookie': `oauth_state=; ${clearCookieFlags(req)}`, ...securityHeaders() }); res.end();
      }
      return;
    }

    let requestPath = decodeURIComponent(url.pathname);
    if (requestPath === '/') requestPath = '/index.html';
    let filePath = path.join(root, requestPath);
    if (requestPath === '/manus-routes.json') filePath = path.join(root, 'public', 'manus-routes.json');
    if (requestPath.startsWith('/icons/')) filePath = path.join(root, 'public', requestPath.slice(1));
    if (!filePath.startsWith(root)) { res.writeHead(403, securityHeaders()); res.end('Forbidden'); return; }
    try { await stat(filePath); } catch { filePath = path.join(root, 'index.html'); }
    const ext = path.extname(filePath);
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache', ...securityHeaders() });
    res.end(body);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Teacher app error' });
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Benni Teacher Assistant listening on 0.0.0.0:${port}`);
});
