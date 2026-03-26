// PapusBank Service Worker v1.0
const CACHE = 'papusbank-v1';
const ASSETS = [
  './banco.html',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&family=Orbitron:wght@400;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Never cache Firebase — always go to network
  if (e.request.url.includes('firebase') ||
      e.request.url.includes('firestore') ||
      e.request.url.includes('gstatic.com')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Network first for main HTML
  if (e.request.url.includes('banco.html') || e.request.url.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // Cache first for assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => new Response('Offline', { status: 503 }))
  );
});
