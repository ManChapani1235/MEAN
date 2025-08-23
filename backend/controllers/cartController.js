import userModel from "../models/userModel.js";

// Add item to the cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId; // Retrieved from authMiddleware

    console.log('Received itemId:', itemId);
    console.log('UserId from authMiddleware:', userId);

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the item in the user's cart
    const cartItem = user.cartData.find(item => item.itemId.toString() === itemId);

    if (cartItem) {
      // If item already exists, increment quantity, ensuring it's a valid number
      cartItem.quantity = (cartItem.quantity || 0) + 1;
    } else {
      // If item does not exist, add it to cart with quantity 1
      user.cartData.push({ itemId, quantity: 1 });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




// Remove item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    if (!itemId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID and User ID are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Remove item from cart
    user.cartData = user.cartData.filter((item) => item.itemId !== itemId);

    await user.save();
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId; // Get userId from middleware or request body

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user.cartData || [] });
  } catch (error) {
    console.error("Error in getCartItems:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the request object

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    // Find the user and populate the cartData field
    const user = await userModel.findById(userId).select("cartData.itemId"); // Select only the itemId field

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send the cart data in the response
    res
      .status(200)
      .json({ success: true, data: user.cartData.map((item) => item.itemId) });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, getCartItems, removeFromCart, getCart };
