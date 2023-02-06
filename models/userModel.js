const mongoose = require("mongoose");
const validator = require("validator");

const userSchame = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    password:{
        type:String,
        required:[true,"Please enter Password"],
        maxLength:[8,"Password cannot exceed 8 characters"]
    },
    avatar:{
        type:String,
        required:true
    },
    role :{
        type:String,
        default:'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt : {
        type:Date,
        default:Date.now()
    }
})


let model = mongoose.model('User',userSchame);

module.exports = model;