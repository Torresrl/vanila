let db;

const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];

const request = indexedDB.open('dbName', 1);

request.onerror = (event) => {
    console.log('Error opening indexedDB');
}

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('Success opening indexedDB');
}

request.onupgradeneeded = (event) => {
    const db = event.target.result;


    const objectStore = db.createObjectStore('customers', {keyPath: 'ssn'});

    objectStore.createIndex('name', 'name', {unique: false});
    objectStore.createIndex('email', 'email', {unique: true});


    objectStore.transaction.oncomplete = (event) => {
        const customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers');
        customerData.forEach((customer) => {
            customerObjectStore.add(customer);
            console.log('Customer added');

            request.onsuccess = (event) => {
                console.log('Added to indexDb succsessful');
            }
        });
    }
}