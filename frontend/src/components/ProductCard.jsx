import React from "react";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="flex flex-col h-full p-4 transition-transform duration-200 border rounded shadow cursor-pointer hover:scale-105" onClick={() => onClick(product)}>
      <div className="flex items-center justify-center w-full h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
      </div>

      <h2 className="mt-2 font-semibold text-center">{product.name}</h2>
      <p className="font-bold text-center text-red-600">${product.price}</p>
    </div>
  );
};

export default ProductCard;
