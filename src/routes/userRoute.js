const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware.js');

router
    .route('/register')
    .post(userController.userRegister)

router
    .route('/companyRegister')
    .post(userController.companyRegister)

router
    .route('/studentRegister')
    .post(userController.studentRegister)

router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/')
    .all(jwtMiddleware.verifyTokenUser)
    .get(userController.userGet)
    .put(userController.userModify)
    .delete(userController.userDelete)


module.exports = router;