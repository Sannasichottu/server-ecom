const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, updateProfile } = require('../controllers/authController');
const { isAuthenticateUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/change').put(isAuthenticateUser,changePassword);
router.route('/myprofile').get(isAuthenticateUser, getUserProfile);
router.route('/update').put(isAuthenticateUser, updateProfile);

module.exports = router;