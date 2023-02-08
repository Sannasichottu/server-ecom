const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReiew } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/authenticate');

router.route("/products").get(isAuthenticateUser, getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);

//review
router.route("/review").put(isAuthenticateUser, createReview);
router.route("/reviews").get(getReviews);
router.route("/review").delete(deleteReiew);

//Admin routes
router.route("/admin/product/new").post(isAuthenticateUser, authorizeRoles('admin'), newProduct);

module.exports = router;