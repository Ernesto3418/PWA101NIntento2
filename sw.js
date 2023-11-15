const CACHE_NAME = 'v1_Ernesto_bch_pwa'

//Agregar los archivos y carpetas
var urlIsToCache = [
    './',
    'main.js',
    'sw.js',
    'IMG/logob.png',
    'IMG/logoSitio.png',
]

//Instala el service worker 
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlIsToCache)
            .then(() => {
                self.skipWaiting()
            })

            .catch(err => {
                console.log('No se registro el cache', err);
            })
        })
    )
})

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        //Borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {self.clients.claim();})
    );
})

self.addEventListener
('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});