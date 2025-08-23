import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique order IDs
import Order from '../models/orderModel.js'; // Import Order model
import jwt from 'jsonwebtoken';

// Function to place a new order
const placeOrder = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, country, address, items, amount } = req.body;

    // Generate a unique orderId
    const orderId = uuidv4();

    // Create a new order object
    const newOrder = new Order({
      orderId,
      firstName,
      lastName,
      email,
      phone,
      country,
      address,
      items,
      amount,
    });

    // Save the new order to the database
    await newOrder.save();

    // Generate a token for the orderId (for potential use in authentication)
    const token = jwt.sign({ orderId }, process.env.JWT_SECRET);

    // Respond with the orderId, token, and a placeholder session URL (for payment gateway)
    res.json({
      success: true,
      orderId,
      token, // Include token in the response
      session_url: "your-session-url" // You can replace this with actual payment session URL
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order. Please try again." });
  }
};

// Function to get an order by its orderId
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch the order using the orderId
    const order = await Order.findOne({ orderId });

    // If the order does not exist, return a 404 error
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return the order details if found
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Function to get all orders (admin access only)
const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Return the list of orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export { placeOrder, getOrderById, getAllOrders };
