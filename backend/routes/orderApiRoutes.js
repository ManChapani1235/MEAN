import express from 'express';
import { verifyOrderToken } from '../middlewares/orderAuthMiddleware.js'; // Import new middleware
import { placeOrder, getOrderById, getAllOrders } from '../controllers/orderController.js'; // Adjust paths as needed

const router = express.Router();

router.post('/place', verifyOrderToken, placeOrder); // Use new middleware
router.get('/get/:orderId', verifyOrderToken, getOrderById); // Use new middleware
router.get('/all', verifyOrderToken, getAllOrders); // Use new middleware

export default router;
