const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const initialData = require('./config/initialData');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Seed initial data
    await seedInitialData();
    console.log('Initial data seeded');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

async function seedInitialData() {
  try {
    // Seed users in parallel
    await Promise.all(initialData.users.map(userData => User.create(userData)));

    // Seed products in parallel
    await Promise.all(initialData.products.map(productData => Product.create(productData)));

    // Seed orders in parallel
    await Promise.all(initialData.orders.map(orderData => Order.create(orderData)));

    console.log('Seeding initial data completed');
  } catch (error) {
    console.error('Error seeding initial data:', error);
    throw error;
  }
}

async function performServerRequests() {
  try {
    // Fetch all users
    const users = await User.findAll();
    console.log('Users:', users);

    // Fetch all products
    const products = await Product.findAll();
    console.log('Products:', products);

    // Fetch all orders
    const orders = await Order.findAll();
    console.log('Orders:', orders);

    // Create a new product
    const newProduct = await Product.create({
      name: 'Sample Product',
      category: 'Sample Category',
      size: 'M',
      quantity: 100,
      price: 20.0,
    });
    console.log('New product created:', newProduct);

    // Update the newly created product
    await Product.update(
      { price: 25.0 },
      { where: { id: newProduct.id } }
    );

    // Fetch the updated product to confirm the changes
    const updatedProduct = await Product.findByPk(newProduct.id);
    console.log('Product updated:', updatedProduct);

    // Delete the product
    const deletedProduct = await Product.destroy({ where: { id: newProduct.id } });
    if (deletedProduct) {
      console.log('Product deleted:', newProduct.id);
    } else {
      console.log('Product deletion failed:', newProduct.id);
    }

    console.log('Server requests performed successfully');
  } catch (error) {
    console.error('Error performing server requests:', error);
    throw error;
  }
}

// Execute server requests for demonstration
(async () => {
  try {
    await performServerRequests();
  } catch (error) {
    console.error('Error in server request execution:', error);
  }
})();
