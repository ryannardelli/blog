const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

router.get('/', DashboardController.showDashboardMain);
router.get('/profile', DashboardController.showProfile);
router.get('/feed', DashboardController.showPosts);
router.get('/forum', DashboardController.showForum);
router.get('/report', DashboardController.showReport);
router.get('/config', DashboardController.showConfig);
router.get('/createPost', DashboardController.showCreatePost);

router.get('/editPost/:id', DashboardController.showEditPost);

router.post('/submitPost', DashboardController.SendPost);
router.post('/deletePost/:id', DashboardController.deletePost);
router.post('/editPost/:id', DashboardController.editPost);

router.get('/postView/:id', DashboardController.showPostView);
router.get('/postViewHome/:id', DashboardController.showPostViewPerHome);

module.exports = router;