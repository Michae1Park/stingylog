// Name of the cache where assets will be stored
const cacheName = "StingyLog";

// List of files and routes to cache for offline use
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
]; 

// Service worker install event
// This runs when the service worker is first installed
self.addEventListener("install", event => {
  // waitUntil ensures the service worker
  // doesn't finish installing until caching is complete
  event.waitUntil(
    // Open (or create) the cache with the given name
    caches.open(cacheName).then(cache => {
      // Add all specified files to the cache
        return cache.addAll(urlsToCache)
    })
  );
});

// Fetch event
// This runs every time the app makes a network request
self.addEventListener("fetch", event => {
  event.respondWith(
    // Check if the requested resource exists in the cache
    caches.match(event.request).then((resp) => {
        // If found in cache, return it
        // Otherwise, fetch it from the network
        return resp || fetch(event.request)
    })
  );
});
