//alert('Hello World!')
document.getElementById('testButton').addEventListener('click', () => {
    console.log('Start fetching')
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Test'})
    }
    fetch('http://localhost:8000', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
})