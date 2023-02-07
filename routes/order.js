const express = require('express');
const { newOrder } = require('../controllers/orderController');
const { isAuthenticateUser } = require('../middlewares/authenticate');
const router = express.Router();



router.route('/order/new').post(isAuthenticateUser, newOrder);

module.exports =router;