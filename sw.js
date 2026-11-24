'use strict';
const CACHE = 'pulso-tap-v3';
const ROOT = new URL('./', self.registration.scope);
const INDEX = new URL('index.html', ROOT);
const ASSETS = [ROOT.href, INDEX.href, new URL('manifest.webmanifest', ROOT).href, new URL('icon.svg', ROOT).href];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  // CacheStorage is shared across the origin; only delete older Pulso Tap caches.
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => /^pulso-tap-v\d+$/.test(key) && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== ROOT.origin) return;

  // Prefer fresh HTML when online; preserve a scoped offline fallback.
  if (request.mode === 'navigate' && (url.pathname === ROOT.pathname || url.pathname === INDEX.pathname)) {
    event.respondWith(fetch(request, { cache: 'no-cache' }).catch(async () => {
      const cache = await caches.open(CACHE);
      return (await cache.match(INDEX.href)) || Response.error();
    }));
    return;
  }

  // Never intercept or search other apps' resources or caches.
  if (!ASSETS.includes(url.href)) return;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(hit => hit || fetch(request)));
});
