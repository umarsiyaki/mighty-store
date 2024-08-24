require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const NodeCache = require('node-cache');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const locationRoutes = require('./routes/locations');
const adminRoutes = require('./routes/admin');
const cashierRoutes = require('./routes/cashier');
const paymentRoutes = require('./routes/payment');
const indexRoutes = require('./routes/index');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Notification = require('./models/Notification');
const Message = require('./models/Message');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cache = new NodeCache();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Caching middleware
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.send(cachedResponse);
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      cache.set(key, body, 60 * 10); // Cache for 10 minutes
      res.originalSend(body);
    };
    next();
  }
};
app.use(cacheMiddleware);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/locations', locationRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/cashier', cashierRoutes);
app.use('/payment', paymentRoutes);
app.use('/', indexRoutes);

// Serve HTML files
const serveHTML = (route, file) => app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'public', file)));
serveHTML('/', 'index.html');
serveHTML('/admin', 'admin.html');
serveHTML('/cashier', 'cashier.html');
serveHTML('/user', 'user.html');
serveHTML('/register', 'register.html');
serveHTML('/login', 'login.html');
serveHTML('/market', 'market.html');
serveHTML('/payment', 'payment.html');
serveHTML('/receipt', 'receipt.html');
serveHTML('/blogs', 'blogs.html');

// Live notifications and messaging
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send message', (msg) => {
    io.emit('receive message', msg);
  });
  socket.on('send notification', (notification) => {
    io.emit('receive notification', notification);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



const connectDB = require('./database');
const messageRoutes = require('./routes/message');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/messages', messageRoutes);

// Serve static files from the public directory
app.use(express.static('public'));

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'message.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const connectDB = require('./database');
const messageRoutes = require('./routes/message');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/messages', messageRoutes);

// Serve static files from the public directory
app.use(express.static('public'));

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'message.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Get vendor options
fetch('api.php?action=getVendors')
  .then(response => response.json())
  .then(vendors => {
    vendors.forEach(vendor => {
      const option = document.createElement('option');
      option.value = (link unavailable);
      option.text = vendor.name;
      vendorSelect.appendChild(option);
    });
  });

// Get category options
vendorSelect.addEventListener('change', () => {
  const vendorId = vendorSelect.value;
  fetch(`api.php?action=getCategories&vendorId=${vendorId}`)
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

// Handle product submission
document.getElementById('submit-btn').addEventListener('click', () => {
  const formData = new FormData(document.getElementById('add-product-form'));
  fetch('api.php?action=addProduct', {
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
  fetch('public/api.js?action=login', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    });
});