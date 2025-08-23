import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://greatstack:33858627@cluster0.t7oit.mongodb.net/food-del', {
      //useNewUrlParser: true,
      // 
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
