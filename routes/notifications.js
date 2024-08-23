// notifications.js
const express = require('express');
const router = express.Router();

// Mock notification data
const notifications = [
  { title: "Profile updated", time: "15 minutes ago" },
  { title: "New user added", time: "30 minutes ago" },
  { title: "Password changed", time: "1 hour ago" }
];

// Route to fetch notifications
router.get('/fetch', (req, res) => {
  res.json(notifications);
});

module.exports = router;