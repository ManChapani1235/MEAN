import Order from '../models/orderModel.js'; // Import your Order model

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, country, address, items, amount } = req.body;
    const newOrder = new Order({
      orderId: uuidv4(), // Generate unique orderId
      firstName,
      lastName,
      email,
      phone,
      country,
      address,
      items,
      amount,
    });

    await newOrder.save();
    res.json({ success: true, orderId: newOrder.orderId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error placing order.' });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
