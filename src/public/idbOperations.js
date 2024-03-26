// idbOperations.js
export async function fetchAllCustomers(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('customers', 'readonly');
        const store = transaction.objectStore('customers');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Include other operations like addCustomer, deleteCustomer, etc.
