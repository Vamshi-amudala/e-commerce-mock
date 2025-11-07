import React from "react";

const Cart = ({ cart, refreshCart, loading }) => {
  const handleRemove = async (productId) => {
    await fetch(`/api/cart/${productId}`, { method: "DELETE" });
    refreshCart();
  };

  const handleQtyChange = async (productId, qtyChange) => {
    if (qtyChange > 0) {
      await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: qtyChange }),
      });
    } else {
      await fetch(`/api/cart/${productId}?qty=${-qtyChange}`, { method: "DELETE" });
    }
    refreshCart();
  };

  const handleCheckout = async () => {
    if (!cart?.items?.length) return alert("Cart is empty!");
    const res = await fetch(`/api/cart/checkout`, { method: "POST" });
    if (!res.ok) return alert("Checkout failed!");
    const receipt = await res.json();
    alert(`Checkout Successful!\nOrder ID: ${receipt.orderId}\nTotal: $${receipt.total}`);
    refreshCart();
  };

  if (loading) return <p className="mt-6 text-center">Loading cart...</p>;
  if (!cart?.items?.length) return <p className="mt-6 text-center">Your cart is empty.</p>;

  return (
    <div className="max-w-5xl p-4 mx-auto mt-6 bg-white rounded shadow">
      <h2 className="mb-6 text-2xl font-bold text-center">Your Cart</h2>
      <ul>
        {cart.items.map(item => (
          <li key={item.product._id} className="flex flex-col items-center justify-between pb-4 mb-6 border-b md:flex-row">
            <div className="flex items-center w-full md:w-2/3">
              <img src={item.product.image} alt={item.product.name} className="object-cover w-24 h-24 mr-4 rounded" />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price} x {item.qty} = ${item.product.price * item.qty}</p>
              </div>
            </div>
            <div className="flex items-center mt-4 space-x-2 md:mt-0">
              <button onClick={() => handleQtyChange(item.product._id, -1)} className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">-</button>
              <span className="px-2 font-semibold">{item.qty}</span>
              <button onClick={() => handleQtyChange(item.product._id, 1)} className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">+</button>
              <button onClick={() => handleRemove(item.product._id)} className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total: ${cart.total}</p>
        <button onClick={handleCheckout} className="px-6 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
