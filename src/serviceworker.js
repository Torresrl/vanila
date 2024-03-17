/*
got a warning in the book that this should be in src foler, I wil try to have it her,
to avoid making changes to server.
 */
const version = 'V0.01'
const statickCatchName = 'staticfiles' + version
const imageCatchname = 'images'

const cacheList = [statickCatchName, imageCatchname]

addEventListener('install',  (event) => {
    event.waitUntil(
        caches.open(statickCatchName).then(statickCatch => {
            statickCatch.addAll(['/helloWorld.js', '/main.css', '/offline'])
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