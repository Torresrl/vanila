// customerService.js
import { openDB } from './dbInit.js';
import { fetchAllCustomers } from './idbOperations.js';

export async function getAllCustomers() {
    try {
        const db = await openDB();
        return await fetchAllCustomers(db);
    } catch (error) {
        console.error("Failed to fetch customers: ", error);
    }
}
