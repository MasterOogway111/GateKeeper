//import { jwt } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
    type:String, 
    required:true
    },  // anyuser in databas connectDB(); 
    email : {
    type:String, 
    required:true,
    unique : true
    },
    password : {
    type:String, 
    required:true
    },
    verifyOtp : {
      type:String
    , default: ''
    }, // whenever new user is created default otp would be empty 
    verifyOtpExpireAt:{
    type: Number , 
    default:0
    },
    isAccountVerified:{
    type: Boolean,
    default:false
    },// for new user 
    resetOtp:{
    type : String,
    default: ''
    },
    resetOtpExpireAt:{
      type :Number,
      default:0
    },
})  

const UserModel = mongoose.models.user || mongoose.model('user',userSchema); // first search for user model if not found than create a new one 

export default UserModel;