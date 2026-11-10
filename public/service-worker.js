const CACHE_PREFIX = 'life-in-the-spirit-';
const BUILD_ID = '__LIFEOS_BUILD_ID__';
const CACHE_NAME = `${CACHE_PREFIX}${BUILD_ID}`;
const BUILD_ASSETS = '__LIFEOS_BUILD_ASSETS__';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/site-navigation.css',
  '/spirit-icon-192.png',
  '/spirit-icon-512.png',
  ...BUILD_ASSETS
];
const OPTIONAL_PAGES = [
  '/church.html',
  '/Bible.html',
  '/Life%20in%20the%20spirit.html',
  '/reflection.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        await cache.addAll(APP_SHELL);
        await Promise.all(OPTIONAL_PAGES.map((url) => cache.add(url).catch((error) => {
          console.warn(`Could not cache optional page ${url}:`, error);
        })));
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'LIFEOS_SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  const isHashedAsset = /\.[a-z0-9_-]{8,}\./i.test(new URL(request.url).pathname);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (isHashedAsset && cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response.ok || !cached ? response : cached;
    } catch (error) {
      if (cached) return cached;
      throw error;
    }
  })());
});
