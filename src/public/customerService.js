// customerService.js
import { openDB } from './dbInit.js';
import { fetchAllCustomers, putCustomer } from './idbOperations.js';

export async function getAllCustomers() {
    try {
        const db = await openDB();
        return await fetchAllCustomers(db);
    } catch (error) {
        console.error("Failed to fetch customers: ", error);
    }
}

export async function addCustomer(customer) {
    try {
        const db = await openDB();
        await putCustomer(db, customer);
    } catch (error) {
        console.error("Failed to add customer: ", error);
    }
}
