import React from 'react';
import Navbar from './navbar';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
