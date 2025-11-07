import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-gray-100 shadow">
      <Link to="/" className="ml-6 text-xl font-bold text-gray-800 transition-transform hover:scale-105 ">
        Mock E-Com Store
      </Link>
      <nav className="mr-10 space-x-8">
        <Link to="/cart" className="mr-5 font-sans text-lg font-bold text-emerald-600 hover:text-red-500">
          Cart
        </Link>
        <Link to="/orders" className="text-lg font-bold text-emerald-600 hover:text-red-500">
          Orders
        </Link>
      </nav>
    </header>
  );
};

export default Header;
