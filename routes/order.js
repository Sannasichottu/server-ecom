const express = require('express');
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController');
const { isAuthenticateUser } = require('../middlewares/authenticate');
const router = express.Router();



router.route('/order/new').post(isAuthenticateUser, newOrder);
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder);
router.route('/myorders').get(isAuthenticateUser, myOrders);

module.exports =router;