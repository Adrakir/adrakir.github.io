'use strict';
const CACHE_NAME='adrakir-offline-2026-10-25-new-topics-v4';
const SCOPE=new URL('./',self.location.href);
const ASSETS=['./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const cache=await caches.open(CACHE_NAME);await cache.addAll(ASSETS.map(path=>new Request(new URL(path,SCOPE),{cache:'reload'})));await self.skipWaiting();})());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('adrakir-offline-')&&key!==CACHE_NAME)await caches.delete(key);await self.clients.claim();})());
});
async function pageResponse(request){
 const cache=await caches.open(CACHE_NAME),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),3500);
 try{
  const response=await fetch(request,{signal:controller.signal});
  if(!response.ok)throw new Error('Page unavailable');
  try{await cache.put(new URL('./index.html',SCOPE).href,response.clone());}catch{}
  return response;
 }catch(error){const cached=await cache.match(new URL('./index.html',SCOPE).href);if(cached)return cached;return new Response('Bitte die Adrakir-App einmal mit Internet öffnen, damit die Geschichten offline gespeichert werden können.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}
 finally{clearTimeout(timer);}
}
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==SCOPE.origin)return;
 if(request.mode==='navigate'&&(url.pathname===SCOPE.pathname||url.pathname===new URL('./index.html',SCOPE).pathname)){event.respondWith(pageResponse(request));return;}
 if(ASSETS.some(path=>new URL(path,SCOPE).pathname===url.pathname))event.respondWith((async()=>{const cache=await caches.open(CACHE_NAME),cached=await cache.match(url.href);if(cached)return cached;const response=await fetch(request);if(response.ok){try{await cache.put(request,response.clone());}catch{}}return response;})());
});
