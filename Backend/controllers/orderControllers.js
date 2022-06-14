const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandlder");
const catchAsyncErrors =  require('../middleware/catchAsyncErrors');

//create new order
exports.newOrder = catchAsyncErrors(async (req,res,next)=>{
    const {
    shippingInfo,
    orderItems,
    PaymentInfo,
    itemsPrice,taxPrice,
    shippingPrice,
    totalPrice 
} = req.body;

const order = await Order.create({
    shippingInfo,
    orderItems,
    PaymentInfo,
    itemsPrice,taxPrice,
    shippingPrice,
    totalPrice ,
    paidAt:Date.now(),
    user:req.user._id,

})

res.status(201).json({
   sucess:true,
   order
})
})

//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
   const order = await Order.findById(req.params.id).populate(
       "user",
       "name email"
   )
   if(!order){
       return next(new ErrorHandler("order not found with this Id", 404))
   }

   res.status(200).json({
       sucess:true,
       order,
   })
})

//get logged in User orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user: req.user._id})
    

    if(!orders){
        return next(new ErrorHandler("Order not found with this Id",404))
    }

    res.status(200).json({
        sucess:true,
        orders
    })
})


//get all orders --admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    if(!orders){
        return next(new ErrorHandler("no any orders",404))
    }
  
    res.status(200).json({
      success: true,
      orders,
    });
  })

//update Order Status --admin
exports.updateOrder =  catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404))
    }
    
   if(order.orderStatus==="Delivired"){
       return next(new ErrorHandler('this order is already delivired'))
   }

   order.orderItems.forEach(async(order)=>{
       await updateStock(order.product,order.quantity)
   })
   order.orderStatus = req.body.status;

   if(req.body.status === "Delivired"){
       order.deliveredAt = Date.now()
   }
   
   await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
       
    }) 
})

async function updateStock(id,quantity){

const product = await Product.findById(id);

product.stock -= quantity
await product.save({validateBeforeSave:false})
}


//delete order --admin
exports.deleteOrder =  catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404))
    }
    await order.remove()
    res.status(200).json({
        success:true,
        
    })
})