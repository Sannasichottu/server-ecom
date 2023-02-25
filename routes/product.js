const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReiew,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      //cb- callback
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);

//review
router.route("/review").put(isAuthenticateUser, createReview);
router.route("/reviews").get(getReviews);
router.route("/review").delete(deleteReiew);

//Admin routes
router
  .route("/admin/product/new")
  .post(
    isAuthenticateUser,
    authorizeRoles("admin"),
    upload.array("images"),
    newProduct
  );
router
  .route("/admin/products")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;
