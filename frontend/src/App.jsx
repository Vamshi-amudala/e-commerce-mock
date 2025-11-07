import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductsGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import { addToCart as addToCartAPI, fetchCart } from "./api";

const App = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loadingCart, setLoadingCart] = useState(true);

  const loadCart = async () => {
    setLoadingCart(true);
    const data = await fetchCart();
    setCart(data);
    setLoadingCart(false);
  };

  useEffect(() => { loadCart(); }, []);

  const handleAddToCart = async (productId, qty = 1) => {
    await addToCartAPI(productId, qty);
    loadCart();
  };

  return (
    <Router>
      <Header cart={cart} />
      <main className="container min-h-screen p-4 mx-auto">
        <Routes>
          <Route path="/" element={<ProductsGrid onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} refreshCart={loadCart} loading={loadingCart} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
