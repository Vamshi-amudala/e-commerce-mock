import Order from "../models/orderModel.js";

const MOCK_USER_ID = "User123";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: MOCK_USER_ID }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
