const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandlder");
const catchAsyncErrors =  require('../middleware/catchAsyncErrors');
const apiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary')

//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next)=>{

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
   
 
   req.body.images = imagesLinks
   req.body.user = req.user.id
   
    const product = await Product.create(req.body);
    res.status(201).json({
      success:true,
      product
    })
   
})

//get all products
exports.getAllProducts = catchAsyncErrors(async(req, res,next)=>{
    const resultPerPage = 8
    const productsCount = await Product.countDocuments();
    const apiFeature = new apiFeatures(Product.find(), req.query)
    .search()
    .filter();
   
    let products = await apiFeature.query;
    let filteredProductCount = products.length;
    apiFeature.pagination(resultPerPage)
    products = await apiFeature.query.clone();

    res.status(200).json({
         sucess:true,
         products,
         productsCount,
         resultPerPage,
         filteredProductCount
    })
})


//get all products --admin
exports.getAdminProducts = catchAsyncErrors(async(req, res,next)=>{
  const products = await Product.find()
  res.status(200).json({
      success:true,
      products
  })
})

//update products -- admin

exports.updateproduct = catchAsyncErrors(async(req, res, next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }
   
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }




   product = await Product.findByIdAndUpdate(req.params.id, req.body,{
       new:true,
       runValidators:true,
       useFindAndModify:false
    });

    res.status(200).json({
        success:true,
         product

    })
})

// delete products --admin

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);



    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }


   for(let i= 0; i< product.images.length; i++){
     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
   }



    await product.remove();

    res.status(200).json({
        success:true,
        message:"product Delete Sucessfully"
    })
})

//Get products details

exports.getProductsDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }
     res.status(200).json({
            sucess:true,
            product
        })
})


//create a review and update a review

exports.createProductReview = catchAsyncErrors(async(req, res,next)=>{
   const {rating,comment,productId}= req.body
    const review = {
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment
    }

    const product = await Product.findById(productId);

    const isReviewed = await product.reviews.find(rev=> rev.user.toString() === req.user._id.toString())
    
    if(isReviewed){
        product.reviews.forEach((rev) =>{
          if(rev.user.toString() === req.user._id.toString())
              (rev.rating = rating),
             (rev.comment = comment)
          
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    
      
    let avg = 0;
     product.reviews.forEach(rev=>{
        avg+=rev.rating
    })

    product.ratings =avg /product.reviews.length

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        sucess:true
    })
})
