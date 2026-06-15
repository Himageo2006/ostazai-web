// OstazAI Service Worker v3.0
// Version bump forces cache refresh on all clients
const CACHE_VERSION = 'ostazai-v145';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.json',
  '/og-image.svg',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap',
];

// ── Install: skip waiting immediately so new SW activates right away ──────────
self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

// ── Activate: clean up old caches ─────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: smart caching strategy ─────────────────────────────────────────────
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Never cache API calls — always go to network
  if (url.hostname.includes('railway.app') || url.pathname.startsWith('/api')) {
    return e.respondWith(
      fetch(e.request).catch(() =>
        new Response(JSON.stringify({ error: 'غير متصل بالإنترنت' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
  }

  // Never cache Google Fonts requests
  if (url.hostname.includes('fonts.g')) {
    return;
  }

  // For navigation requests (page loads): network-first, fall back to cache
  if (e.request.mode === 'navigate') {
    return e.respondWith(
      fetch(e.request)
        .then(res => {
          // Update cache with fresh version
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
  }

  // app.js: always network-first so updates are instant
  if (url.pathname.endsWith('/app.js')) {
    return e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
  }

  // PDF books: cache-first (large files, rarely change)
  if (url.pathname.includes('/books/')) {
    return e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }

  // For other JS/CSS/images: stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(res => {
        if (res && res.status === 200 && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => null);

      return cached || fetchPromise;
    })
  );
});

// ── Push notifications ─────────────────────────────────────────────────────────
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'أستاذ AI 🎓';
  const body  = data.body  || 'حان وقت المذاكرة! 📚';

  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon:  data.icon  || '/og-image.svg',
      badge: '/og-image.svg',
      dir:   'rtl',
      lang:  'ar',
      tag:   'ostazai-reminder',
      vibrate: [200, 100, 200],
      actions: [
        { action: 'open',    title: '📖 افتح التطبيق' },
        { action: 'dismiss', title: 'لاحقاً' },
      ],
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'open' || !e.action) {
    e.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});
