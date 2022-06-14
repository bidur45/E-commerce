 const express = require('express');
 const errorMiddleware = require("./middleware/error")
 const cookieParser = require("cookie-parser")
 const bodyParser = require('body-parser')
 const fileupload = require("express-fileupload")
 const app = express();
 const dotenv = require('dotenv');


 dotenv.config({path:'Backend/config/config.env'})


 app.use(express.json());
 app.use(cookieParser())
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(fileupload())
 //Route Imports
 const product = require("./routes/productRoute");
 const user = require("./routes/userRoute")
 const order = require("./routes/orderRoute")

 app.use("/api/v1",product)
 app.use("/api/v1",user)
 app.use("/api/v1",order)



 //middleware for errors
 app.use(errorMiddleware);


 module.exports = app;