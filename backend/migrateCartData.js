import mongoose from 'mongoose';
import userModel from './models/userModel.js'; // Adjust the path as needed

// Example migration script to convert array cartData to a Map
const migrateCartData = async () => {
    try {
      // Find users where cartData is an array
      const users = await userModel.find({ 'cartData.0': { $exists: true } });
      
      for (const user of users) {
        const cartDataArray = user.cartData; // Current cartData array
        const newCartData = new Map();
  
        // Assuming cartData is an array of objects with itemId and quantity
        cartDataArray.forEach(item => {
          if (item.itemId) {
            newCartData.set(item.itemId, item.quantity || 1); // Default quantity to 1 if not specified
          }
        });
  
        user.cartData = newCartData;
        await user.save();
      }
      
      console.log('Migration completed');
    } catch (error) {
      console.error('Migration error:', error.message);
    }
  };
  
  migrateCartData();
  