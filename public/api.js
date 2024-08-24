
const express = require('express');
const router = express.Router();
const {
    getCashiers,
    getDashboardData,
    getInventoryData,
    confirmOrder,
    getMessages,
    getNotifications,
    getRecentSales,
    getSalesChart,
    getSaleRevenue,
    getTopSellingCategories,
    getCashierPerformance,
    updateSettings
} = require('../controllers/apiController');

// Define routes
router.get('/cashiers', getCashiers);
router.get('/dashboard', getDashboardData);
router.get('/inventory', getInventoryData);
router.post('/orders/:orderId/confirm', confirmOrder);
router.get('/messages', getMessages);
router.get('/notifications', getNotifications);
router.get('/recent-sales', getRecentSales);
router.get('/sales-chart', getSalesChart);
router.get('/sale-revenue', getSaleRevenue);
router.get('/top-selling-categories', getTopSellingCategories);
router.get('/cashier-performance', getCashierPerformance);
router.post('/settings', updateSettings);


// Import required modules 
const app = express();
const mysql = require('sql');

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});

// Handle vendor options
app.get('/api/vendors', (req, res) => {
  db.query('SELECT * FROM Vendors', (err, vendors) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching vendors' });
    } else {
      res.send(vendors);
    }
  });
});

// Handle category options
app.get('/api/categories/:vendorId', (req, res) => {
  const vendorId = req.params.vendorId;
  db.query(`SELECT * FROM Categories WHERE vendor_id = ${vendorId}`, (err, categories) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching categories' });
    } else {
      res.send(categories);
    }
  });
});

// Handle product submission
app.post('/api/products', (req, res) => {
  const { name, vendorId, categoryId, size, quantity, price, image, trackingNumber } = req.body;
  db.query(`INSERT INTO Products (name, vendor_id, category_id, size, quantity, price, image, tracking_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, vendorId, categoryId, size, quantity, price, image, trackingNumber], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error adding product' });
    } else {
      res.send({ message: 'Product added successfully' });
    }
  });
});

// Handle login submission
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query(`SELECT * FROM Users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
    if (err || !user) {
      res.status(401).send({ message: 'Invalid login credentials' });
    } else {
      res.send({ message: 'Login successful' });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


fetch('/server/api/vendors')
fetch('/server/api/categories/:vendorId')
fetch('/server/api/products')
fetch('/server/api/login')


// Get vendor options
fetch('/api/vendors')
  .then(response => response.json())
  .then(vendors => {
    // ...
  });

// Get category options
fetch(`/api/categories/${vendorId}`)
  .then(response => response.json())
  .then(categories => {
    // ...
  });

// Handle product submission
document.getElementById('submit-btn').addEventListener('click', () => {
  const formData = new FormData(document.getElementById('add-product-form'));
  fetch('/api/products', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  });
});

// Handle login submission
document.getElementById('login-btn').addEventListener('click', () => {
  const formData = new FormData(document.getElementById('login-form'));
  fetch('/api/login', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  });
});


module.exports = router;