const app = require('./app');
const cloudinary = require ('cloudinary')
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");


// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('shutting down the server due to uncaught Exception')
    process.exit(1)
})


//config
dotenv.config({path:'Backend/config/config.env'})

//connecting to database
connectDatabase()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(5000, ()=>{
    console.log(`server is running on http://localhost:5000`);
})

//unhaldled promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('shutting down the server due to unhandled promise Rejection');

    server.close(()=>{
        process.exit(1)
    })
})

