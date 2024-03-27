// idbOperations.js
export  const  fetchAllCustomers = async (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('customers', 'readonly');
        const store = transaction.objectStore('customers');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export const putCustomer = async (db, customer) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('customers', 'readwrite');
        const store = transaction.objectStore('customers');
        const request = store.put(customer);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Include other operations like addCustomer, deleteCustomer, etc.
