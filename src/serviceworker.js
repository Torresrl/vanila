/*
got a warning in the book that this should be in src foler, I wil try to have it her,
to avoid making changes to server.
 */
const version = 'V0.01'
const statickCatchName = 'staticfiles' + version
const imageCatchname = 'images'
const requestCatchName = 'requests'

const cacheList = [statickCatchName, imageCatchname, requestCatchName]

addEventListener('install',  (event) => {
    event.waitUntil(
        caches.open(statickCatchName).then(statickCatch => {
            statickCatch.addAll([
                '/helloWorld.js',
                '/main.css',
                '/offline',
                '/dbInit.js',
                '/idbOperations.js',
                '/indexedDbTest.js',
                '/customerService.js'
            ])
        })
    )
});
addEventListener('activate', (event) => {
    console.log('The service worker is activated.');
});
addEventListener('fetch',  (event) => {
    event.waitUntil(() => {
        caches.keys()
            .then(caches => {
                return Promise.all(
                    caches.map(cacheName => {
                        if (!cacheList.includes(cacheName)) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            }).then(() => {
                return clients.claim();
        })
    })

    const req = event.request

    if (req.headers.get('Accept').includes('text/html')) {
        return event.respondWith(
            fetch(req)
                .catch((error) => {
                    return caches.match('/offline');
                })
        )
    }

    console.log(`rett før if statementet metode ${req.method} og url ${req.url}`)
    if (req.method === 'POST' && req.url.includes('localhost:8000')) {
        console.log('gikk inn i fuksjonen')
        return event.respondWith(fetch(req).then((res) => {
            console.log('gåt som normalt')
            return res
        }).catch((error) => {
            console.log('gikk inn i catch')
            event.waitUntil(
                caches.open(requestCatchName).then((requestCatch) => {
                    return requestCatch.put(req, new Response('You are offline, your request will be sent once you are online'))
                })
            )
        }))
    }



    if (req.headers.get('Accept').includes('image')) {
        return event.respondWith(
            caches.match(req).then((resCatch) => {

                if (resCatch) {
                    return resCatch
                }

                return fetch(req).then((res) => {
                    const resClone = res.clone()

                    event.waitUntil(
                        caches.open(imageCatchname).then((imgCatch) => {
                            return imgCatch.put(req, resClone)
                        })
                    )

                    return res
                })

            })
        )
    } else {
        event.respondWith(
            caches.match(req).then((resCatch) => {
                if (resCatch) {
                    return resCatch
                }

                return fetch(req)
            })
        )
    }

    console.log(req)
    console.log('The service worker is listening.', );
});