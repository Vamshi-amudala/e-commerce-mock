import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const QuantityModal = ({ isOpen, onClose, onConfirm, product }) => {
  const [qty, setQty] = useState(1);

  const handleConfirm = () => {
    onConfirm(product._id, qty);
    setQty(1);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel className="p-6 bg-white rounded shadow-lg w-80">
        <Dialog.Title className="text-lg font-bold">{product.name}</Dialog.Title>
        <p className="mt-2">Price: ${product.price}</p>

        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setQty((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <span className="px-3">{qty}</span>
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setQty((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            Add to Cart
          </button>
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default QuantityModal;
