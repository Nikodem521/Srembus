/**
 * sw.js — cache "powłoki" aplikacji, żeby działała też bez internetu
 * po pierwszym otwarciu. Dane rozkładu są statyczne i wpięte w js/data.js,
 * więc trafiają do tego samego cache co reszta kodu.
 *
 * Uwaga (uczciwie, zgodnie z ograniczeniami Safari): iOS potrafi
 * wyczyścić Cache Storage dla rzadko odwiedzanych stron po ok. 7 dniach
 * nieaktywności. To wygoda offline, nie gwarancja — przy braku sieci
 * i wyczyszczonym cache aplikacja poprosi o ponowne wczytanie online.
 */

const CACHE_NAME = "srem-bus-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/data.js",
  "./js/time.js",
  "./js/storage.js",
  "./js/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first dla plików powłoki; sieć jako uzupełnienie i odświeżenie w tle.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
