const cacheName = 'v3';
const cacheAsset = [
    '.../index.html',
    'script.js',
    '../css'
]

//install
self.addEventListener('install', (e) =>{
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache =>{
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAsset);
        })
        .then(  ()=> self.skipWaiting())
    )
})

//activate
self.addEventListener('activate', (e) =>{
    console.log('Service Worker: Activated')
//remove Unwanted Cache
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//fetch Catched files
self.addEventListener('fetch', (e) =>{
    console.log('Service Worker: Fetching')
    e.respondWith(
        fetch(e.request).catch( ()=> caches.match(e.request))
    )

})

//fetch Catched files
// self.addEventListener('fetch', (e) =>{
//     console.log('Service Worker: Fetching')
//     e.respondWith(
//         fetch(e.request)
//         .then(res => {
//             //clone/copy response
//             const resClone = res.Clone();
//             //open cache
//             caches.open(cacheName)
//             .then(cache => {
//                 //Add response to cache
//                 cache.put(e.request, resClone);
//             });
//             return res;
//         }).catch(err => caches.match(e.request).then(res => res))        
//     );

// });

 