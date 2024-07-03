"use client"; // Ensure this is at the top of the file

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Use new hooks from next/navigation
import Navbar from '@/app/navbar'; // Adjust the path to your Navbar component
import houses from '@/app/houses'; // Adjust the path to your houses data
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

const ProductDetails: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productId = pathname?.split('/').pop(); // Extract productId from the pathname
  const [product, setProduct] = useState<House | null>(null);

  useEffect(() => {
    console.log("productId:", productId); // Add this log for debugging
    console.log("houses data:", houses); // Add this log for debugging
    if (productId) {
      const selectedProduct = houses.find((item) => item.productId === productId);
      if (selectedProduct) {
        setProduct(selectedProduct);
      }
    }
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Details</h1>
        <motion.div
          className="mb-4 p-4 border rounded shadow-sm bg-white hover:bg-gray-100 transition-colors duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
          <p className="mb-2">{product.description}</p>
          <p className="mb-2"><strong>Category:</strong> {product.category}</p>
          <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
          <p className="mb-2"><strong>Country ID:</strong> {product.countryId}</p>
          <p className="mb-2"><strong>Status:</strong> {product.status}</p>
          <p className="mb-2"><strong>Current Status:</strong> {product.currentStatus}</p>
          <p className="mb-2"><strong>User ID:</strong> {product.userId}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;
