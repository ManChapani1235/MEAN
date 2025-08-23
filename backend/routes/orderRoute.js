import express from 'express';
import authMiddleware, { adminAuthMiddleware } from '../middleware/auth.js'; // Ensure correct path
import { placeOrder, getOrderById, getAllOrders } from '../controllers/orderController.js'; // Ensure correct path

const router = express.Router();

// Route for placing an order (authenticated users)
router.post('/place', authMiddleware, placeOrder);

// Route to get all orders (admin only)
router.get('/admin-orders', adminAuthMiddleware, getAllOrders);

// Route to get a specific order by its orderId (authenticated users)
router.get('/order/:orderId', authMiddleware, getOrderById);

// Route to get all orders (temporary route for testing without admin middleware)
router.get('/all', getAllOrders); // Remove the middleware temporarily for testing

// Route to get a user's orders (get by userId if needed)
router.get('/user-orders', authMiddleware, getOrderById);

// Fallback route for fetching a specific order by its orderId (optional)
router.get('/:orderId', getOrderById);

export default router;
