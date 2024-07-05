import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <img src="/images/logo.png" alt="Rent & Sell Tn Logo" className="h-8" />
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/product" className="hover:underline">Product</a></li>
          <li><a href="/profile" className="hover:underline">Profile</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/signIn" className="hover:underline">signIn</a></li>
          <li><a href="/logIn" className="hover:underline">Log in</a></li>
          <li><a href="/updateProduct" className="hover:underline">update</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
