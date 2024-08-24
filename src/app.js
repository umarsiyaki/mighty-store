
// Import required modules
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const mongoose = require('mongoose');
const csrf = require('csurf');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const logger = require('morgan');
const compression = require('compression');
const sslRedirect = require('heroku-ssl-redirect');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/warehouse-inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
}));
const secretCode = require('crypto').randomBytes(64).toString('hex');
console.log(secretCode)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/warehouse-inventor',
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(csrf());
app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(sslRedirect());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve individual js files
app.get('/js/addproduct.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/js/addproduct.js'));
});
app.get('/js/payment.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/js/payment.js'));
});
app.get('/js/admin.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/js/admin.js'));
});
// ... (add all the individual js files here)

// Serve css files
app.get('/css/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/css/styles.css'));
});

// Serve image files
app.get('/images/Bigi-cola.jpeg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/images/Bigi-cola.jpeg'));
});
app.get('/images/other-image.jpeg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/images/other-image.jpeg'));
});

// Routes
const auth = require('./routes/auth');
const addCashierRoute = require('./routes/addcashier');
const Cashier = require('./routes/cashier');
const admin = require('./routes/addcashier');
const api = require('./routes/api');
const marketing = require('./routes/marketing');
const chart = require('./routes/chat');
app.use('/api/cashier', addCashierRoute);
app.use('/api/admin', admin);
app.use('/api/marketing', marketing);
app.use('/api/calculator', calculator);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/message', message);
app.use('/api/location', location);
app.use('/api/user', user);
app.use('/api/receipt', receipt);

// HTML pages
app.get('/updateproduct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'updateproduct.html'));
});
app.get('/cashier', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cashier.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
// ... (add all the HTML pages here)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Serve image files
app.get('/images/Bigi-cola.jpeg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/images/Bigi-cola.jpeg'));
});
app.get('/images/other-image.jpeg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/images/other-image.jpeg'));
});

// Redirecting
app.get('/redirect', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'login':
      res.redirect('/login');
      break;
    case 'register':
      res.redirect('/register');
      break;
    case 'cashier':
      res.redirect('/cashier');
      break;
    case 'admin':
      res.redirect('/admin');
      break;
    case 'marketing':
      res.redirect('/marketing');
      break;
    default:
      res.redirect('/login');
  }
});

// Message
app.get('/message', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'send':
      // Handle send message logic
      res.redirect('/message-sent');
      break;
    case 'inbox':
      res.redirect('/inbox');
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'message.html'));
  }
});

// Notification
app.get('/notification', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'view':
      res.redirect('/notification-view');
      break;
    case 'clear':
      // Handle clear notification logic
      res.redirect('/notification-cleared');
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'notification.html'));
  }
});

// Order
app.get('/order', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'place':
      // Handle place order logic
      res.redirect('/order-placed');
      break;
    case 'view':
      res.redirect('/order-view');
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'order.html'));
  }
});

// Receipt
app.get('/receipt', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'view':
      res.redirect('/receipt-view');
      break;
    case 'print':
      // Handle print receipt logic
      res.redirect('/receipt-printed');
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'receipt.html'));
  }
});

// Transportation
app.get('/transportation', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'track':
      // Handle track transportation logic
      res.redirect('/transportation-tracked');
      break;
    case 'view':
      res.redirect('/transportation-view');
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'transportation.html'));
  }
});

// History Login
app.get('/history-login', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'view':
      res.redirect('/history-login-view');
      break;
    case 'clear':
      // Handle clear history login logic
      res.redirect('/history-login-cleared');
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'history-login.html'));
  }
});

// Redirecting
app.get('/redirect', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'login':
      res.redirect('/login.html');
      break;
    case 'register':
      res.redirect('/register.html');
      break;
    case 'cashier':
      res.redirect('/cashier.html');
      break;
    case 'admin':
      res.redirect('/admin.html');
      break;
    case 'marketing':
      res.redirect('/marketing.html');
      break;
    case 'message':
      res.redirect('/message.html');
      break;
    case 'notification':
      res.redirect('/notification.html');
      break;
    case 'order':
      res.redirect('/order.html');
      break;
    case 'receipt':
      res.redirect('/receipt.html');
      break;
    case 'transportation':
      res.redirect('/transportation.html');
      break;
    case 'history-login':
      res.redirect('/history-login.html');
      break;
    default:
      res.redirect('/login.html');
  }
});
// Order
app.get('/order', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'place':
      // Handle place order logic
      res.redirect('/order-placed');
      break;
    case 'view':
      res.redirect('/order-view');
      break;
    case 'proceed-to-payment':
      res.redirect('/payment.html'); // or wherever you want to redirect
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'order.html'));
  }
});



// Cart
app.get('/cart', (req, res) => {
  const { button } = req.query;
  switch (button) {
    case 'add':
      // Handle add product logic
      const { productId, quantity } = req.query;
      // Add product to cart
      res.redirect('/cart.html');
      break;
    case 'remove':
      // Handle remove product logic
      const { productId } = req.query;
      // Remove product from cart
      res.redirect('/cart.html');
      break;
    case 'proceed-to-payment':
      // Handle proceed to payment logic
      const { totalAmount } = req.query;
      res.redirect(`/payment.html?totalAmount=${totalAmount}`);
      break;
    case 'view':
      res.sendFile(path.join(__dirname, 'public', 'cart.html'));
      break;
    default:
      res.sendFile(path.join(__dirname, 'public', 'cart.html'));
  }
});

// Payment
app.get('/payment', (req, res) => {
  const { totalAmount } = req.query;
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
  // Handle payment logic
  // Post order details to database
});

// Database logic to store order details
app.post('/place-order', (req, res) => {
  const { products, totalAmount } = req.body;
  // Store order details in database
  res.send('Order placed successfully!');
});


// HTML pages
app.get('/updateproduct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'updateproduct.html'));
});
app.get('/cashier', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cashier.html'));
});


app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/addcashier', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addcashier.html'));
});

app.get('/addproduct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addproduct.html'));
});

app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

app.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'receipt.html'));
});

app.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calculator.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register-login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/widgets', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'widgets.html'));
});


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

