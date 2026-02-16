// Define cache name and files to cache
const CACHE_NAME = 'musicportalapp-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',   // Example main page
    '/styles.css',   // Example styles
    '/script.js',    // Example script
    // Add other assets you want to cache
];

// Install event - caching needed files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// Fetch event - serving cached files
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cached response available; return it. Else fetch from network.
                return response || fetch(event.request);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});