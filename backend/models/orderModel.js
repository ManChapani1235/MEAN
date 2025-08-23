import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  items: [{
    itemId: { type: String, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  amount: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
