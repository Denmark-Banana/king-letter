// Minimal no-op service worker to avoid 404s triggering Clerk middleware mismatch errors.
// See: https://clerk.com/docs/reference/nextjs/errors/auth-was-called
self.addEventListener("install", () => {
  // Immediately activate updated SW
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No-op: pass-through
});
