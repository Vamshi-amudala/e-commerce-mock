const API_URL = "http://localhost:5000/api";

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${API_URL}/cart`);
  return res.json();
};

export const addToCart = async (productId, qty = 1) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty }),
  });
  return res.json();
};

export const deleteFromCart = async (productId, qty) => {
  const query = qty ? `?qty=${qty}` : "";
  const res = await fetch(`${API_URL}/cart/${productId}${query}`, {
    method: "DELETE",
  });
  return res.json();
};

export const checkoutCart = async () => {
  const res = await fetch(`${API_URL}/cart/checkout`, {
    method: "POST",
  });
  return res.json();
};
