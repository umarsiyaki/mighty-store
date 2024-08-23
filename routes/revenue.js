const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/RevenueController');

// Routes for revenue tracking
router.get('/daily', RevenueController.getDailyRevenue);
router.get('/weekly', RevenueController.getWeeklyRevenue);
router.get('/monthly', RevenueController.getMonthlyRevenue);
router.get('/yearly', RevenueController.getYearlyRevenue);

module.exports = router;
