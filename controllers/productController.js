const Product = require('../models/productModel');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

// Get Products - /api/v1/products
exports.getProducts =  catchAsyncError ( async (req,res,next) => {
    const apiFeatures = new APIFeatures(Product.find(), req.query).search();

    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        count:products.length,
        products,
    })
});

// Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError ( async (req,res, next) => {
    const product =  await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});


// Get Single Product - /api/v1/product/:id
exports.getSingleProduct = catchAsyncError ( async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        /* return res.status(404).json({
            success:false,
            message:"Product not fount"
        }); */

        return next(new ErrorHandler('Product not found', 400));
    }
    res.status(201).json({
        success:true,
        product
    })
});

// Update Product - /api/v1/product/:id
exports.updateProduct = catchAsyncError ( async (req,res,next) => {
    let product =  await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success:false,
            message:"Product not fount"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        product
    })
});


//Delete Product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError ( async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success:false,
            message:"Product not fount"
        });
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted!"
    })
});