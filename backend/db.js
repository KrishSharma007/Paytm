const mongoose=require("mongoose")
const connect=async()=>{
    try {
        await mongoose.connect("mongodb+srv://krishsharma8105:Tannu%40007@paytm.n0cdo.mongodb.net/")
        console.log("Connected to db......");
    } catch (error) {
        console.log("Error occured while connecting to db.....");
    }
 }
connect();
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
})
const AccountSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required:true,
    }
})
const User=mongoose.model('User',UserSchema);
const Account=mongoose.model('Account',AccountSchema);
module.exports={
    User,Account
}