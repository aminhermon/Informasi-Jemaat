// ============================================================
// Service Worker — App Jemaat PWA
// ============================================================

const CACHE_NAME = 'app-jemaat-v1';
const STATIC_CACHE = 'static-v1';

// Core files to pre-cache (app shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

// External CDN resources to cache on first use
const CDN_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com'
];

// ---- Install: pre-cache app shell ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(APP_SHELL).catch(err => {
        console.warn('[SW] Pre-cache partial failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ---- Activate: clean old caches ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== STATIC_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ---- Fetch strategy ----
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  // Skip Google Sheets / Apps Script API calls — always go to network
  if (url.hostname.includes('script.google.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('accounts.google.com')) {
    return;
  }

  // CDN resources: cache-first with network fallback
  const isCDN = CDN_HOSTS.some(h => url.hostname.includes(h));
  if (isCDN) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => cached || new Response('', { status: 503 }));
      })
    );
    return;
  }

  // App shell (same-origin): cache-first, update in background
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => null);

        return cached || fetchPromise || caches.match('/index.html');
      })
    );
  }
});

// ---- Background sync placeholder ----
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    // Future: trigger data sync with Google Sheets
    console.log('[SW] Background sync triggered');
  }
});

// ---- Push notification placeholder ----
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'App Jemaat', body: 'Ada pembaruan baru.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png'
    })
  );
});
