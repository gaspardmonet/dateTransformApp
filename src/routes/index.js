const express = require('express');
const router = express.Router();

const transformationController = require('../controllers/date-transformation-controller.js');
const authenticationMiddleware = require('../middlewares/authentication').authenticationMiddleware;

router.post('/transformation/transform', authenticationMiddleware, transformationController.transformToMondayColumn);

module.exports = router;
