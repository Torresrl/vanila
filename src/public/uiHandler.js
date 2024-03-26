// uiHandler.js
import { getAllCustomers } from './customerService.js';

async function displayCustomers() {
    const customers = await getAllCustomers();
    const listElement = document.getElementById('customerList');
    listElement.innerHTML = ''; // Clear existing list items if any


    customers.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${customer.name} - ${customer.email}`; // Example of displaying customer name and email
        listElement.appendChild(listItem);
    });
}

displayCustomers().catch(console.error);