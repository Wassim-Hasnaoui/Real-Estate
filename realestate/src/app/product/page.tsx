"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../navbar'; // Adjust path as per your project structure

interface Product {
  productId: number;
  productName: string;
  description: string;
  category: string;
  price: number;
  countryName: string;
  status: string;
  currentStatus: string;
  userId: number;
}

interface SelectedProduct extends Product {
  images: { productImageID: number; imageURL: string; productID: number }[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5000/api/products/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = async (productId: number) => {
    if (!productId) {
      console.error("Invalid productId:", productId);
      return;
    }

    try {
      const response = await axios.get<SelectedProduct>(`http://localhost:5000/api/products/one/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {selectedProduct ? (
          <div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mb-4"
            >
              Back to Products
            </button>
            <motion.div
              className="mb-4 p-4 border rounded shadow-sm bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">{selectedProduct.productName}</h2>
              <p className="mb-4">{selectedProduct.description}</p>
              <p className="mb-2"><strong>Category:</strong> {selectedProduct.category}</p>
              <p className="mb-2"><strong>Price:</strong> ${selectedProduct.price}</p>
              <p className="mb-2"><strong>Country:</strong> {selectedProduct.countryName}</p>
              <p className="mb-2"><strong>Status:</strong> {selectedProduct.status}</p>
              <p className="mb-2"><strong>Current Status:</strong> {selectedProduct.currentStatus}</p>
              <p className="mb-2"><strong>User ID:</strong> {selectedProduct.userId}</p>
              <div className="mb-2">
                <strong>Images:</strong>
                {selectedProduct.images.map((image) => (
                  <img key={image.productImageID} src={image.imageURL} alt="Product Image" className="w-32 h-32 object-cover" />
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div
                  key={product.productId}
                  className="mb-4 p-4 border rounded shadow-sm bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleProductClick(product.productId)}
                >
                  <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
                  <p className="mb-2">{product.description}</p>
                  <p className="mb-2"><strong>Category:</strong> {product.category}</p>
                  <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
                  <p className="mb-2"><strong>Country:</strong> {product.countryName}</p>
                  <p className="mb-2"><strong>Status:</strong> {product.status}</p>
                  <p className="mb-2"><strong>Current Status:</strong> {product.currentStatus}</p>
                  <p className="mb-2"><strong>User ID:</strong> {product.userId}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
