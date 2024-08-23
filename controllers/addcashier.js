
// ../controller/addcashier.js
const { sendEmail } = require('../services/emailService'); // Assuming you have an email service module
const Cashier = require('../models/Cashier'); // Replace with your actual model

exports.addCashier = async (req, res) => {
  try {
    const { username, email, phone, address, password } = req.body;
    
    // Create new cashier and save to database
    const newCashier = new Cashier({ username, email, phone, address, password });
    await newCashier.save();

    // Send email to the cashier with their login details
    const emailResponse = await sendEmail({
      to: email,
      subject: 'Welcome to Our Team',
      body: `Hello ${username}, your account has been created. Your login details are Username: ${username} and Password: ${password}`,
    });

    res.status(201).json({ success: true, message: 'Cashier added successfully', emailResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding cashier', error });
  }
};