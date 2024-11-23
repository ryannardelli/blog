const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.get('/', RegisterController.showRegister);
router.post('/create', RegisterController.createUser);
module.exports = router;