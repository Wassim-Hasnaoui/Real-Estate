"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from next/link
import housesData from '../houses'; // Adjust path as per your project structure
import { motion } from 'framer-motion';
import Navbar from '../navbar'; // Adjust path as per your project structure

interface House {
  productId: string;
  productName: string;
  description: string;
  category: string;
  price: number;
  countryId: string;
  status: string;
  currentStatus: string;
  userId: string;
}

const ProductList: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    setHouses(housesData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Use the Navbar component */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        <div className="mb-8 flex justify-center">
          <Link href="/product/list">
            <motion.button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              List Product 
            </motion.button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((house) => (
            <Link key={house.productId} href={`/product/${house.productId}`}>
              <motion.div
                className="mb-4 p-4 border rounded shadow-sm bg-white hover:bg-gray-100 transition-colors duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-xl font-semibold mb-2">{house.productName}</h2>
                <p className="mb-2">{house.description}</p>
                <p className="mb-2"><strong>Category:</strong> {house.category}</p>
                <p className="mb-2"><strong>Price:</strong> ${house.price}</p>
                <p className="mb-2"><strong>Country ID:</strong> {house.countryId}</p>
                <p className="mb-2"><strong>Status:</strong> {house.status}</p>
                <p className="mb-2"><strong>Current Status:</strong> {house.currentStatus}</p>
                <p className="mb-2"><strong>User ID:</strong> {house.userId}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
