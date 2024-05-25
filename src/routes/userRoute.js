const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router
    .route('/register')
    .post(userController.userRegister)


module.exports = router;