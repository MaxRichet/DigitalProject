const express = require('express');
const router = express.Router();
const userappController = require('../controllers/userappController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware.js');

router
    .route('/:idjobad')
    .get(jwtMiddleware.verifyTokenCompany, userappController.userappGetAllCompany)

router
    .route('/:iduserstud')
    .put(jwtMiddleware.verifyTokenStudent, userappController.userappPut)

router
    .route('/:iduserapp')
    .delete(jwtMiddleware.verifyTokenUser, userappController.userappDelete)

router
    .route('/student')
    .post(jwtMiddleware.verifyTokenStudent, userappController.userappCreate)
    .get(jwtMiddleware.verifyTokenStudent, userappController.userappGetAllStudent)

module.exports = router;