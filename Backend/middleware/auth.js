const ErrorHandler = require('../utils/errorhandlder')
const catchAsyncErrors = require('./catchAsyncErrors')
const Jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{
   const {token} = req.cookies
 
   if(!token){
       return next(new ErrorHandler("please login",401))
   }
   const decodedData = Jwt.verify(token, process.env.JWT_SECRET)

   req.user = await userModel.findById(decodedData.id);

   next()
    
})

exports.authorizeRole = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access`,403))
        }
        next()
    }
}