//Frontend Requests (JavaScript)

//**Add Cashier**:

//javascript
function addCashier(cashierData) {
    fetch('/api/cashier/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashierData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('notification').textContent = 'Cashier added successfully.';
        } else {
            document.getElementById('notification').textContent = 'Error adding cashier.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('notification').textContent = 'Error adding cashier.';
    });
}


 //**Delete Cashier**:

//javascript
function deleteCashier(cashierId) {
    fetch(`/api/cashier/delete/${cashierId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('notification').textContent = 'Cashier deleted successfully.';
        } else {
            document.getElementById('notification').textContent = 'Error deleting cashier.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('notification').textContent = 'Error deleting cashier.';
    });
}


//Update Cashier**:

//javascript
function updateCashier(cashierId, updatedData) {
    fetch(`/api/cashier/update/${cashierId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('notification').textContent = 'Cashier updated successfully.';
        } else {
            document.getElementById('notification').textContent = 'Error updating cashier.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('notification').textContent = 'Error updating cashier.';
    });
}