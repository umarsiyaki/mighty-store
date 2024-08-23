
// app.js
const express = require('express');
const mongoose = require('mongoose');
const cashierRoutes = require('./routes/cashierRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/oladayo_enterprises', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the cashier routes
app.use('/cashiers', cashierRoutes);

module.exports = app;
// app.js
const express = require('express');
const path = require('path');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const auth = require('./routes/auth');
const addCashierRoute = require('./routes/addcashier');
const Cashier = require('./routes/cashier');
const admin = require('./routes/addcashier');
const api = require('./routes/api');
const marketing = require('./routes/marketing');
const chart = require('./routes/chat');

// Add cashier route
app.use('/api/cashier', addCashierRoute);

// use admin route
app.use('/api/admin', admin);

// Add product route
app.use('/api/product', addProductRoute);

//marketing route
app.use('/api/marketing', marketing);

// calculator route
app.use('/api/calculator', calculator);

// update product route
app.use('/api/updateProduct', updateProduct);

// daily transaction routes 
app.use('/api/order', order);

// product routes 
app.use('/api/product', product);

// message route
app.use('/api/message', message);

// location route
app.use('/api/location', location);

//  user route
app.use('/api/user', user);

// recipt route
app.use('/api/receipt', receipt);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// update product HTML page
app.get('/updateproduct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'updateproduct.html'));
});

// cashier HTML page
app.get('/cashier', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cashier.html'));
});

// Admin HTML page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
// location HTML page
app.get('/location', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'location.html'));
});
// calculator HTML page
app.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calculator.html'));
});
// Add blog HTML page
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});
// marketing HTML page
app.get('/marketing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'marketing.html'));
});
// home page HTML page
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// chart HTML page
app.get('/chart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chart.html'));
});
// receipt HTML page
app.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'receipt.html'));
});
// payment HTML page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});
// register login HTML page
app.get('/register-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register-login.html'));
});
// user HTML page
app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});
// signup HTML page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Listen on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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

// Initialize Express app

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set security headers using Helmet
app.use(helmet());

// Set up rate limiter to prevent DDoS and brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// CSRF protection
const csrfProtection = csrf();
app.use(csrfProtection);

// Session handling
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/your-db-name', // Replace with your DB
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true, // Set to true if using https
    httpOnly: true, // Prevents client-side JS from reading the cookie
  },
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Flash messages for notifications
app.use(flash());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/cashier', require('./routes/cashier'));

// Handle 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   // Serve static files like CSS, JS, Images
   app.use(express.static(path.join(__dirname, 'public')));

   // Route to fetch products dynamically
   app.get('/api/products', (req, res) => {
     // Sample product data, replace with your database query
     const products = [
       { id: 1, name: 'Coca-Cola', price: 50, description: 'Coca-Cola drink.', image: 'coca_cola.jpg' },
       { id: 2, name: 'Pepsi', price: 45, description: 'Pepsi drink.', image: 'pepsi.jpg' },
           // Add more products as needed
       ];
     res.json(products);
   });

   // Serve the marketing page
   app.get('/marketing', (req, res) => {
     res.sendFile(path.join(__dirname, 'views/marketing.html'));
   });

   app.listen(3000, () => console.log('Server running on port 3000'));