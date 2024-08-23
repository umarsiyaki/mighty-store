const express = require('express');
const router = express.Router();

// Route to home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Other routes for the updated pages
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/market.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user.html'));
});

router.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/calculator.html'));
});

router.get('/blogs', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/blogs.html'));
});

router.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/payment.html'));
});

router.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/receipt.html'));
});
router.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/calculator.html'));
});


router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

router.get('/cashier', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cashier.html'));
});

router.get('/marketing', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/marketing.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/payment.html'));
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/addcashier', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/addcashier.html'));
});

router.get('/updateproduct', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/updateproduct.html'));
});

router.get('/addproduct', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/addproduct.html'));
});
import React from 'react';
import ReactDOM from 'react-dom';
import '../public/assets/styles.css'; // Import global CSS (optional)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Attach to a DOM element with id 'root'
);

module.exports = router;

