// dbInit.js
export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('dbName', 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            db.createObjectStore('customers', {keyPath: 'ssn'});
            // Add additional object stores here
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject('Database error: ' + event.target.errorCode);
        };
    });
}
