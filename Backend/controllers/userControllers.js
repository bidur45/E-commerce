const ErrorHandler = require("../utils/errorhandlder")
const catchAsyncErrors =  require('../middleware/catchAsyncErrors')
const User = require("../models/userModel");
const sendToken = require("../utils/token");
const crypto = require('crypto')
const cloudinary = require('cloudinary')
 
// register a user
exports.registerUser =  catchAsyncErrors(async(req,res,next)=>{
   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
       folder:"avatars",
       width:150,
       crop:"scale"
   })
   
    const {name,email,password}=req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })

    sendToken(user,201,res)
})

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

      if(!email || !password){
          return next(new ErrorHandler("please Enter Email & password", 400))
      }
     
      const user = await User.findOne({email}).select("+password");
      

      if(!user){
          return next(new ErrorHandler("Invalid email or password"),401)
      }

      const isPasswordMatched = await user.comparePassword(password)
      
       
      if(!isPasswordMatched){
          return next(new ErrorHandler("Invalid email or password"),401)
      }


   sendToken(user,200,res)
})    

//logout user
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{


    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        sucess: true,
        message:"loggged out"
    })
})




//get user details
exports.getUserDetails = catchAsyncErrors(async(req, res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        sucess:true,
        user
    })
})

//update user password
exports.updateUserPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user).select("+password")
     const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

     if(!isPasswordMatched){
         return next(new ErrorHandler("old password is incorrect",400))
     }

     if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
      }
    
      user.password = req.body.newPassword

      await user.save()
      sendToken(user, 200, res)
})


// update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, res,next)=>{

    const updatedUserData={
        name:req.body.name,
        email:req.body.email
    }

     if(req.body.avatar !== ""){
         const user = await User.findById(req.user.id);
         const imageId = user.avatar.public_id;

         await cloudinary.v2.uploader.destroy(imageId)
     

     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    updatedUserData.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    }
}

    const user = await  User.findByIdAndUpdate(req.user.id, updatedUserData, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        sucess:true,
        user
        
    })
})

//get all users

exports.getAllUser = catchAsyncErrors(async (req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        sucess:true,
        users
    })
})

//get users details (admin)

exports.getSingleUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User does not exit with Id: ${req.params.id}`))
    }

    res.status(200).json({
        sucess:true,
        user
    })
})

// update user roles --admin
 exports.updateUserRole =  catchAsyncErrors(async(req,res,next)=>{
    const userData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

     
     await  User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators:true,
        useFindAndModify: true
    })


    res.status(200).json({
        success:true,
       
    })
 })

 //Delete User --Admin
 exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
      const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exit with id:${req.params.id}`))
    }

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove()

    res.status(200).json({
        success:true,   
        message:'user deleted sucessfully'
    })

 })

