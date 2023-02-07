const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders } = require('../controllers/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();



router.route('/order/new').post(isAuthenticateUser, newOrder);
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder);
router.route('/myorders').get(isAuthenticateUser, myOrders);


//Admin routes
router.route("/orders").get(isAuthenticateUser, authorizeRoles('admin'), orders);

module.exports =router;