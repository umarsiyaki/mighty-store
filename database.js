
const mongoose = require('mongoose');

// Optionally set up mongoose configurations here
mongoose.set('debug', true); // Example: Enable debug mode


// database.js
const mongoose = require('mongoose');

// Define schema for Products
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Define schema for BlogPosts
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});


// Create models
const Product = mongoose.model('Product', productSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Product, BlogPost, User };


Client (React.js);
const mongoose = require('mongoose');

   // Define schema for Products
   
   // Define schema for BlogPosts
   

   // Define schema for Users
   const userSchema = new mongoose.Schema({
     name: {
       type: String,
       required: true,
     },
     email: {
       type: String,
       required: true,
     },
     password: {
       type: String,
       required: true,
     },
   });


   module.exports = { Product, BlogPost, User };
   
   
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

// MongoDB Connection (for Location and Cashier using Mongoose)
const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/inventoryDB', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

// Sequelize Connection (for Cashier using Sequelize)
const sequelize = new Sequelize('inventoryDB', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const connectSequelize = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL');
    } catch (error) {
        console.error('Sequelize Connection Error:', error);
    }
};

// Initialize both connections
connectMongoDB();
connectSequelize();

module.exports = { mongoose, sequelize };


// database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/oladayo_ventures', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// mongoose.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // Set this to true if you want strict query validation

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // To handle deprecation warnings
  useCreateIndex: true,    // To handle deprecation warnings
};

mongoose.connect('mongodb://localhost:27017/oladayo_ventures', options);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose is connected to MongoDB');
});

db.on('error', (err) => {
  console.error(`Mongoose connection error: ${err.message}`);
});

db.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/oladayo-enterprises', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

module.exports = mongoose;
