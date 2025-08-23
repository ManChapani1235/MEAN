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
  email: { type: String, required: true },
  password: { type: String, required: true },
  cartData:[{
    itemId: Array, // or the type of the itemId
    quantity: Number
  }], // Array of cart items
});

// Create the model or use an existing one
const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;

