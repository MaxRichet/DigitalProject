const express = require('express');
const router = express.Router();
const jobadsController = require('../controllers/jobadsController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware.js');

router
    .route('/')
    .all(jwtMiddleware.verifyTokenCompany)
    .post(jobadsController.jobadsCreate)
    .get(jobadsController.jobadsGet)
    .put(jobadsController.jobadsModify)
    .delete(jobadsController.jobadsDelete)


module.exports = router;