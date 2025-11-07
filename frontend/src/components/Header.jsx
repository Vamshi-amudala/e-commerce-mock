import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-gray-100 shadow">
      <Link to="/" className="text-xl font-bold text-gray-800">
        Mock E-Com Store
      </Link>
      <nav className="space-x-8">
        <Link to="/cart" className="font-semibold text-blue-600 hover:text-blue-800">
          Cart
        </Link>
        <Link to="/checkout" className="font-semibold text-blue-600 hover:text-blue-800">
          Checkout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
