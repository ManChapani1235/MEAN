import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
//     cartData:{type:Object,default:{}},
// },{minimize:false})

// const userModel = mongoose.models.user || mongoose.model("user",userSchema);

//const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Foods', required: true } // Ensure the ref matches the food model name
}, { _id: false }); // Prevents creation of an additional _id field

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData:[{
    // Match controller usage where itemId is compared as string
    itemId: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }
  }], // Array of cart items
});

// Create the model or use an existing one
const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;

