import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import QuantityModal from "./QuantityModal";
import { fetchProducts } from "../api";

const ProductsGrid = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleConfirm = (productId, qty) => {
    onAddToCart(productId, qty);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-10 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0
          ? <p>Loading products...</p>
          : products.map((product) => (
              <ProductCard key={product._id} product={product} onClick={handleCardClick} />
            ))}
      </div>

      <QuantityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductsGrid;
