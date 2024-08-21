
    fetch('/api/updateProduct', {
        method: 'POST',
        body: JSON.stringify(updatedProductData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from the server
    });