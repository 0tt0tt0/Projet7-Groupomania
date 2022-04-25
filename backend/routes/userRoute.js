const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');

//Routes issues des spécifications fonctionnelles
router.post('/signup', userCtrl.signup);
//router.post('/login', userCtrl.login);

module.exports = router;