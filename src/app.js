require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const csrf = require('csurf');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set security headers using Helmet
app.use(helmet());

// Set up CORS
app.use(cors());

// Set up rate limiter to prevent DDoS and brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// CSRF protection
const csrfProtection = csrf();
app.use(csrfProtection);

// Session handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/oladayo_ventures',
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false, // Set to true if using https
    httpOnly: true, // Prevents client-side JS from reading the cookie
  },
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Flash messages for notifications
app.use(flash());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/cashier', require('./routes/cashier'));
app.use('/admin', require('./routes/admin'));
app.use('/marketing', require('./routes/marketing'));
app.use('/api/products', require('./routes/product'));

// HTML Page Routes
const htmlPages = [
  'updateproduct', 'cashier', 'admin', 'location', 
  'calculator', 'blog', 'marketing', 'index', 
  'chart', 'receipt', 'payment', 'register-login', 
  'user', 'signup'
];

htmlPages.forEach(page => {
  app.get(`/${page}`, (req, res) => res.sendFile(path.join(__dirname, 'public', `${page}.html`)));
});

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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oladayo_ventures', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Email Configuration Example (Using Nodemailer)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// JWT Configuration Example (Using jsonwebtoken)
function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import routes
const adminRoutes = require('./routes/admin');
const cashierRoutes = require('./routes/cashier');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const calculatorRoutes = require('./routes/calculator');
const receiptRoutes = require('./routes/receipt');
const marketingRoutes = require('./routes/marketing');
const revenueRoutes = require('./routes/revenue');
const performanceRoutes = require('./routes/performance');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/admin', adminRoutes);
app.use('/cashier', cashierRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/payment', paymentRoutes);
app.use('/calculator', calculatorRoutes);
app.use('/receipt', receiptRoutes);
app.use('/marketing', marketingRoutes);
app.use('/revenue', revenueRoutes);
app.use('/performance', performanceRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.error('Database connection error:', error);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
