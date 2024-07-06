"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';;

interface Product {
  productID: number;
  productName: string;
  description: string;
  category: string;
  price: number;
  countryName: string;
  status: string;
  current_status: string;
  imageURL: string;
}

interface User {
  userName: string;
  phone: string;
  email: string;
  image: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      console.log("fronttoken", token);

      try {
        const userResponse = await axios.get('http://localhost:5000/api/user/one', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);
        console.log("userres", userResponse.data);

        const productsResponse = await axios.get('http://localhost:5000/api/products/userProduct', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(productsResponse.data.ProductsOfUser);
        console.log("userreseee", productsResponse.data.ProductsOfUser);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDeleteProduct = async (productID: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/products/remove/${productID}`,{
      });
      setProducts(products.filter(product => product.productID !== productID));
      alert('Product deleted successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to delete product');
    }
  };
  const handleUpdateProduct = (productID: number) => {
    router.push(`/updateProduct/${productID}`);
  };
  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <h2>User Details</h2>
          <p>Username: {user.userName}</p>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email}</p>
          {user.image && <img src={user.image} alt="User Image" style={{ width: '100px', height: '100px' }} />}
        </div>
      )}

      <h2>User Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.productID}>
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Country: {product.countryName}</p>
              <p>Status: {product.status}</p>
              <p>Current Status: {product.current_status}</p>
              {product.imageURL && <img src={`http://localhost:5000/api/products/${product.imageURL}`} alt={product.productName} style={{ width: '100px', height: '100px' }} />}
              <button onClick={() => handleDeleteProduct(product.productID)}>Delete</button>
              <button onClick={() => handleUpdateProduct(product.productID)}>Update</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Profile;
