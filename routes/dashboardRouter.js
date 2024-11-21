const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

router.get('/', DashboardController.showDashboardMain);
module.exports = router;