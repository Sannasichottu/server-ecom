const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();



router.route('/order/new').post(isAuthenticateUser, newOrder);
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder);
router.route('/myorders').get(isAuthenticateUser, myOrders);


//Admin routes
router.route("/orders").get(isAuthenticateUser, authorizeRoles('admin'), orders);
router.route("/order/:id").put(isAuthenticateUser, authorizeRoles('admin'), updateOrder);

module.exports =router;