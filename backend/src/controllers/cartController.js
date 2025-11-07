import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
const MOCK_USER_ID = "User123";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: MOCK_USER_ID }).populate("items.product");
    if (!cart) return res.json({ items: [], total: 0 });

    cart.items = cart.items.filter(i => i.product);
    const total = cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    res.json({ items: cart.items, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const quantity = parseInt(qty);
    if (!productId || !quantity || quantity <= 0) return res.status(400).json({ message: "Invalid productId or qty" });

    let cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) cart = new Cart({ userId: MOCK_USER_ID, items: [] });

    const item = cart.items.find(i => i.product.toString() === productId);
    if (item) item.qty += quantity;
    else cart.items.push({ product: productId, qty: quantity });

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    const total = populatedCart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    res.json({ items: populatedCart.items, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = parseInt(req.query.qty);

    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(i => i.product.toString() === id);
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    if (qty && cart.items[index].qty > qty) cart.items[index].qty -= qty;
    else cart.items.splice(index, 1);

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    const total = populatedCart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    res.json({ items: populatedCart.items, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: MOCK_USER_ID }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart empty" });

    // Filter out invalid products
    const validItems = cart.items.filter(i => i.product && i.product.price != null);
    if (!validItems.length)
      return res.status(400).json({ message: "No valid products in cart" });

    const total = validItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    // Create the order document
    const order = new Order({
      userId: MOCK_USER_ID,
      items: validItems.map(i => ({
        product: i.product._id,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
        subtotal: i.product.price * i.qty
      })),
      total,
      timestamp: new Date()
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.json(order); // return the stored order as receipt
  } catch (error) {
    console.error("Checkout error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
