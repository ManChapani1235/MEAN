import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  items: [
    {
      itemId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  amount: Number
});

export default mongoose.model('Order', orderSchema);
