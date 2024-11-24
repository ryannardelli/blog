const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.get('/', LoginController.showPageLogin);
router.get('/logout', LoginController.logout);
router.post('/loginUser', LoginController.loginUser);
module.exports = router;