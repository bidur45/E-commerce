const ErrorHandler = require('../utils/errorhandlder')


module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


   // incorrect mongodb id error

   if(err.name === "CastError"){
       const message = `Resource not found, Invalid: ${err.path}`
       err = new ErrorHandler(message,400)
   }

   //mongoose duplicate key error
   if(err.code === 1100){
      const message = `Duplicate ${Object.keys(err.keyValue)} entered` 
      err = new ErrorHandler(message, 400)
   }

  // wrong JWT token
   if(err.name === "jsonWebTokenError"){
    const message = `json web token is invalid`
    err = new ErrorHandler(message,400)
}

// wrong JWT expire error
if(err.name === "TokenExpiredError"){
    const message = `json web token is expired`
    err = new ErrorHandler(message,400)
}

    res.status(err.statusCode).json({
        sucess:false,
        message:err.message
    })
}