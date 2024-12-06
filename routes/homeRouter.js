const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.showHome);
router.post('/posts/:id/like', HomeController.incrementLike);
router.post('/posts/:id/unlike', HomeController.decrementLike);
module.exports = router;