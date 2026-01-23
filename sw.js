const cacheName = "StingyLog";
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
]; 

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
        return cache.addAll(urlsToCache)
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
        return resp || fetch(event.request)
    })
  );
});
