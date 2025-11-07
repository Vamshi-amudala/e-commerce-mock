import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items.product");
    if (!cart) return res.json({ items: [], total: 0 });

    const total = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    );

    res.json({ items: cart.items, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items?.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ product: productId, qty });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};


export const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params; 
    const { qty } = req.body; 

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    
    if (qty && cart.items[itemIndex].qty > qty) {
      cart.items[itemIndex].qty -= qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json({ message: "Item updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
};


export const checkout = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );

    // Mock receipt
    const receipt = {
      orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000), // random 6-digit order ID
      purchasedItems: items.map(i => ({
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
        subtotal: i.product.price * i.qty
      })),
      total,
      timestamp: new Date().toISOString(),
      message: "Checkout successful",
    };

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Error during checkout", error: error.message });
  }
};
