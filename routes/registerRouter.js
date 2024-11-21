const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.get('/', RegisterController.showRegister);
module.exports = router;