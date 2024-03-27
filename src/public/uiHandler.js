// uiHandler.js
import { getAllCustomers, addCustomer } from './customerService.js';

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

const addCustomerForm = async () => {
    document.getElementById("addCustomer").addEventListener("click", async () => {
        const customer = {
            ssn: document.getElementById('customerSsn').value,
            name: document.getElementById('customerName').value,
            age: document.getElementById('customerAge').value,
            email: document.getElementById('customerEmail').value
        };

        await addCustomer(customer);
        cleanForm();
        await displayCustomers();
    });
}

await addCustomerForm();

const cleanForm = () => {
    document.getElementById('customerSsn').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerAge').value = '';
    document.getElementById('customerEmail').value = '';
}