import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      qty: Number,
      price: Number,
      subtotal: Number
    }
  ],
  total: Number,
  timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
