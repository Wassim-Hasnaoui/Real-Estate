"use client";

import { useEffect, useState } from 'react';
import housesData from '../houses';
import { motion } from 'framer-motion';

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

export default function ProductList() {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    // Directly use the imported housesData array
    setHouses(housesData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {houses.map((house) => (
          <motion.div
            key={house.productId}
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
        ))}
      </div>
    </div>
  );
}
