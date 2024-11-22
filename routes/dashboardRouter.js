const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

router.get('/', DashboardController.showDashboardMain);
router.get('/profile', DashboardController.showProfile);
router.get('/feed', DashboardController.showPosts);
router.get('/forum', DashboardController.showForum);
module.exports = router;