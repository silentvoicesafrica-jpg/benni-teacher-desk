const CACHE = 'benni-teacher-v12-b4-bank';
const CORE = ['./', './index.html', './styles.css', './extra-curriculum.js', './energizers.js', './question-bank-b4.js', './question-bank.js', './backup-validation.js', './app.js', './manifest.webmanifest', './public/icons/icon-192.png', './public/icons/icon-512.png'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const base = new URL(self.registration.scope).pathname;
  const local = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : null;
  if (local === null || local.startsWith('api/') || local.startsWith('manus-oauth/')) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && (local === '' || local === 'index.html' || local === 'app.js' || local === 'styles.css' || local === 'manifest.webmanifest')) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match(base + 'index.html'))));
});
