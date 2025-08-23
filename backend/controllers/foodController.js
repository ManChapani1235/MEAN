import foodModel from "../models/foodModel.js";
import fs from "fs";


//add food item

const addFood = async(req,res) =>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename    
    })
    try{
        await food.save();
        res.json({success:true,massage:"Food Added"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,massage:"Error"})
    }
}

// all food list
const listFood=async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false,massage:"Error"})   
    }
}

// remove food item

// remove food item
const removeFood = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Validate ID
      if (!id) {
        return res.status(400).json({ success: false, message: "No ID provided" });
      }
  
      const food = await foodModel.findById(id);
  
      if (!food) {
        return res.status(404).json({ success: false, message: "Food item not found" });
      }
  
      // Remove image
      const imagePath = `uploads/${food.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await foodModel.findByIdAndDelete(id);
  
      res.json({ success: true, message: "Food Removed" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ success: false, message: "Error while removing food" });
    }
  };
  


export {addFood,listFood,removeFood}
