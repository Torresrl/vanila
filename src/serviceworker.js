/*
got a warning in the book that this should be in src foler, I wil try to have it her,
to avoid making changes to server.
 */

const statickCatchName = 'staticfiles'

addEventListener('install',  (event) => {
    event.waitUntil(
        caches.open(statickCatchName).then(statickCatch => {
            statickCatch.addAll(['/helloWorld.js', '/main.css'])
        })
    )
});
addEventListener('activate', (event) => {
    console.log('The service worker is activated.');
});
addEventListener('fetch',  (event) => {
    const req = event.request
    event.respondWith(
        caches.match(req).then((resCatch) => {
            return resCatch || fetch(req)
        }).catch((error) => {
            return new Response('<h1>Oops!</h1> <p>Something went wrong.</p>', {
                headers: {'Content-type': 'text/html; charset=utf-8'}
            });
        })
    )
    console.log(req)
    console.log('The service worker is listening.', );
});