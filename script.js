// Get vendor and category select elements
const vendorSelect = document.getElementById('vendor');
const categorySelect = document.getElementById('category');

// Populate vendor options
fetch('/vendors')
	.then(response => response.json())
	.then(vendors => {
		vendors.forEach(vendor => {
			const option = document.createElement('option');
			option.value = (link unavailable);
			option.text = vendor.name;
			vendorSelect.appendChild(option);
		});
	});

// Populate category options based on selected vendor
vendorSelect.addEventListener('change', () => {
	const vendorId = vendorSelect.value;
	fetch(`/categories?vendorId=${vendorId}`)
		.then(response => response.json())
		.then(categories => {
			categorySelect.innerHTML = '';
			categories.forEach(category => {
				const option = document.createElement('option');
				option.value = (link unavailable);
				option.text = category.name;
				categorySelect.appendChild(option);
			});
		});
});

// Get product list element
const productList = document.getElementById('product-list');

// Populate product list
fetch('/products')
	.then(response => response.json())
	.then(products => {
		products.forEach(product => {
			const listItem = document.createElement('li');
			listItem.textContent = product.name;
			productList.appendChild(listItem);
		});
	});

// Handle product submission
document.getElementById('submit-btn').addEventListener('click', () => {
	const formData = new FormData(document.getElementById('add-product-form'));
	fetch('/products', {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(product => {
			console.log('Product added successfully:', product);
		});
});

// Handle login submission
document.getElementById('login-btn').addEventListener('click', () => {
	const formData = new FormData(document.getElementById('login-form'));
	fetch('/login', {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(user => {
			console.log('Login successful:', user);
		});
});
