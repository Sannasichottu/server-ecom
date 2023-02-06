const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt =require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticateUser = catchAsyncError(async(req,res,next)=> {
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler('Login first to handle this resource',401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    res.user = await User.findById(decoded.id)

    next();

})