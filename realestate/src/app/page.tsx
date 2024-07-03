import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <img src="/images/logo.png" alt="Rent & Sell Tn Logo" className="h-8" />
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/product" className="hover:underline">Product</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/login" className="hover:underline">Log in</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
        <p className="mt-4">This is the home page.</p>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
