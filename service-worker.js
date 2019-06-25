var cacheName = 'v1';
var cacheFiles = [
    './',
    './index.html',
    // './js/app.js',
    // './detour.html',
    './detour.js',
    // './images/Launch.jpg',
    // './images/Part1.jpg',
    // './images/propaganda.jpg',
    // './images/TitleSlide.jpg',
    // './videos/RP1.mp4',
    // './video/RP2.mp4',
    // './video/RP3.mp4'
]

self.addEventListener('install', function(e) {
    console.log("[ServiceWorker] Installed")

    e.waitUntil(

        caches.open(cacheName).then(function(cache) {

            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles)

        })
    )
})

self.addEventListener('activate', function(e) {
    console.log("[ServiceWorker] Activated")

    e.waitUntil(

        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                if (thisCacheName !== cacheName) {

                    console.log('[ServiceWorker] Removing Cached Files from ', thisCacheName)
                    return caches.delete(thisCacheName)
                }

            }))
        })

    )

})

// self.addEventListener('fetch', event => {
//     if (event.request.mode === 'navigate') {
//       event.respondWith(fetch('/pwa'));

//       // Immediately start downloading the actual resource.
//       fetch(event.request.url);
//     }

// });

self.addEventListener('fetch', function(e) {
    console.log("[ServiceWorker] Fetching", e.request.url);

    e.respondWith(

        caches.match(e.request).then(function(response){
            if ( response ) {
                console.log("[ServiceWorker] Found in cache", e.request.url);
                return response;
            }

            var requestClone = e.request.clone();

            return fetch(requestClone).then(function(response) {
                if (!response) {
                    console.log("[ServiceWorker] No response from fetch");
                    return response;
                }
                
                var responseClone = response.clone();

                caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
                
            })
            .catch(function(err) {
                console.log("[ServiceWorker] Error Fetching & Caching New Rseponse")
            })

        })
    )

})