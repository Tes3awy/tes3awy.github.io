const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './index.html',
  './src/css/all.min.css',
  './src/js/all.min.js',
  './src/img/*'
];

window.addEventListener('load', (e) => {
  new PWAConfApp();
  registerSW();
});

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (error) {
      alert('ServiceWorker registration failed. Sorry about that!');
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden');
  }
}

self.addEventListener('install', async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});
self.addEventListener('fetch', async (event) => {
  const req = event.request;
  if (/.*(json)$/.test(req.url)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (error) {
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}
