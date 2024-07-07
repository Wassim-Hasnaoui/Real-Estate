"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '../navbar';

interface Product {
  productID: number;
  productName: string;
  price: number;
  status: string;
  description:string;
  imageURL: string; // imageURLs is an array of strings
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Function to fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/api/products/all');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle clicking on a product
  const handleProductClick = (productID: number) => {
    console.log('Navigating to product details for productID:', productID);
    if (productID) {
      router.push(`/product/${productID}`);
    } else {
      console.error('Product ID is undefined');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        <div className="mb-8 flex justify-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={() => router.push('/product/list')}
          >
            List Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            console.log('Product:', product);
            // Retrieve the first image URL from imageURLs array
            const firstImage = product.imageURL? product.imageURL : '';
            console.log(`First image path: ${firstImage}`);

            // Replace backslashes with forward slashes if necessary
          

            return (
              <div
                key={product.productID}
                className="mb-4 p-4 border rounded shadow-sm bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  console.log('Clicked product:', product);
                  handleProductClick(product.productID);
                }}
              >
                <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
                {firstImage && (
                  <img
                    src={`http://localhost:5000/api/products/${product.imageURL}`}
                    alt={product.productName}
                    className="mb-2 rounded-md"
                    style={{ maxWidth: '100%', height: 'auto' }}
                   
                  />
                )}
                <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
                <p className="mb-2"><strong>Status:</strong> {product.status}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
