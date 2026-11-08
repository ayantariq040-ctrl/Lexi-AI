const C='lexi-main';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin||u.searchParams.has('_'))return;
if(r.mode==='navigate'){e.respondWith(fetch(r.url,{cache:'no-store'}).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(C).then(x=>x.put(registration.scope,c))}return res}).catch(()=>caches.open(C).then(x=>x.match(registration.scope)).then(x=>x||Response.error())));return}
e.respondWith(caches.open(C).then(x=>x.match(r).then(h=>{const n=fetch(r).then(res=>{if(res&&res.ok)x.put(r,res.clone());return res}).catch(()=>h);return h||n})))});
