"use client";

// Import statements
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Component definition
export default function ListProduct() {
  // State variables
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    countryID: '',
    status: '',
    current_status: '',
    userId: ''
  });

  const [images, setImages] = useState<File[]>([]);

  const [fileInputs, setFileInputs] = useState<number[]>([0]); // Array to keep track of file input fields

  // Event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files) {
      const selectedFiles: File[] = Array.from(files);
      setImages(selectedFiles);
    }
  };

  const handleAddFileInput = () => {
    setFileInputs([...fileInputs, fileInputs.length]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('countryID', product.countryID);
      formData.append('status', product.status);
      formData.append('current_status', product.current_status);
      formData.append('userId', product.userId);

      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/api/products/add', formData);
      console.log('Response from server:', response.data);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, e.g., display an error message to the user
      alert('Failed to add product. Please try again later.');
    }
  };

  // JSX structure
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-center">
        <Link href="/product">
          <motion.button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            Back to Product
          </motion.button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">List Your Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country ID</label>
          <input
            type="text"
            name="countryID"
            value={product.countryID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current Status</label>
          <input
            type="text"
            name="current_status"
            value={product.current_status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {fileInputs.map((index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Upload Image {index + 1}</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddFileInput}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Add Another Image
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <motion.button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            Add Product
          </motion.button>
        </div>
      </form>
    </div>
  );
}
