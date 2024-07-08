"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar'; // Adjust path to your Navbar component
import axios from 'axios';
import { motion } from 'framer-motion';

//Define Product interface
interface Product {
  productID: number;
  productName: string;
  description: string;
  category: string;
  price: number;
  countryName: string;
  status: string;
  current_status: string;
  userId: string;
  images: object[]
}


// ProductDetails component
const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Extract productID from the window location pathname
        const productId = window.location.pathname.split('/').pop();
        console.log('Extracted productId from URL:', productId);

        if (productId) {
          const response = await axios.get(`http://localhost:5000/api/products/one/${productId}`);
          console.log('Fetched product:', response.data);
          setProduct(response.data);
          console.log("images",response.data.images);
          
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const nextImage = () => {
    if (product && product.images && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images!.length);
    }
  };

  const previousImage = () => {
    if (product && product.images && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images!.length) % product.images!.length);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }
const buyOrRentTheProduct=async (productID:number)=>{
  const token=localStorage.getItem("token");
  console.log("token is ",token);
  
  if(token){
    console.log("enter");
    
if(product.status==="rent"){
  const response= await axios.post(`http://localhost:5000/api/products/rented/${productID}`)
  if(response.data.success){
    alert("you rent this product succesfully");
  }
  else{
    alert("you cant rent this product");
  }
}
else{
  
  const response= await axios.post(`http://localhost:5000/api/products/sold/${productID}`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if(response.data.success){
    alert("you sold this product succesfully");
  }
  else{
    alert("you cant sold this product");
  }
}
  }
  else {
    alert("please login first");
  }
}
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl"> {/* Adjusted max-width to max-w-3xl */}
        <h1 className="text-3xl font-bold mb-8 text-center">Product Details</h1>

        {/* Display Product Images */}
        <div className="mb-4 p-4 border rounded shadow-sm bg-white hover:bg-gray-100 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-2">Product Images</h2>
          <div className="relative w-full max-w-md mx-auto">
            {product.images && product.images.length > 0 && (
              <motion.img
                src={ `http://localhost:5000/api/products/${product.images[currentImageIndex].imageURL}`}
                alt={product.productName}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {/* Previous Button */}
            {product.images && product.images.length > 1 && (
              <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                onClick={previousImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Previous
              </motion.button>
            )}
            {/* Next Button */}
            {product.images && product.images.length > 1 && (
              <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                onClick={nextImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Next
              </motion.button>
            )}
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            {product.images && product.images.map((imagePath, index) => (
              <img
                key={index}
                src={ `http://localhost:5000/api/products/${imagePath.imageURL}`}
                alt={product.productName}
                className={`w-16 h-16 rounded-lg cursor-pointer ${
                  index === currentImageIndex ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Display Product Details */}
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
          <p className="mb-2"><strong>country Name:</strong> {product.countryName}</p>
          <p className="mb-2"><strong>Status:</strong> {product.status}</p>
          <p className="mb-2"><strong>Current Status:</strong> {product.current_status}</p>
          <p className="mb-2"><strong>User ID:</strong> {product.userId}</p>
         
        </motion.div>
      </div>
      <button onClick={()=>buyOrRentTheProduct(product.productID)} className="mb-2">{product.status==="rent"?"rented this product":"buy this product"}</button>
    </div>
  );
}

export default ProductDetails;
