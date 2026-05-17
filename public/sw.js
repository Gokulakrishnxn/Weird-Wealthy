/** Minimal service worker — enables PWA install on Chromium browsers */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  /* Network-first: no offline cache (pages stay fresh) */
});
