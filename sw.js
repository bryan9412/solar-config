// Cambia la versión cada vez que subas cambios, para que el teléfono descargue la nueva.
const VERSION = "solar-v1";
const APP = ["./", "index.html", "manifest.webmanifest", "icon.svg", "favicon-64.png",
  "icon-192.png", "icon-512.png", "icon-maskable-192.png", "icon-maskable-512.png", "apple-touch-icon.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){ return c.addAll(APP); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== VERSION; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);

  // Fuentes de Google: se guardan la primera vez que hay conexión.
  if(url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    e.respondWith(caches.open(VERSION + "-fonts").then(function(c){
      return c.match(req).then(function(hit){
        const net = fetch(req).then(function(r){ c.put(req, r.clone()); return r; }).catch(function(){ return hit; });
        return hit || net;
      });
    }));
    return;
  }

  if(url.origin !== location.origin) return;

  // La app: primero lo guardado (abre sin internet), y actualiza en segundo plano.
  e.respondWith(caches.open(VERSION).then(function(c){
    const key = req.mode === "navigate" ? "index.html" : req;
    return c.match(key).then(function(hit){
      const net = fetch(req).then(function(r){ if(r.ok) c.put(key, r.clone()); return r; }).catch(function(){ return hit; });
      return hit || net;
    });
  }));
});
