const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')
const Jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter Your Name"],
        maxlength:[25,"Name cannot acced 35 character"],
        minlength:[3,"Name must have more than 3 character"],

    },
    email:{
        type:String,
        required:[true,"please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"please Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true, "pleaseEnter Your Password"],
        minlength:[8,"password should be greter than 8 character"],
        select:false
    },
    avatar:{
          public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
 

})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//jwt token
userSchema.methods.getJWTToken = function () {
    return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  



module.exports = mongoose.model("user",userSchema)