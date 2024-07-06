"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../product';
import { Images } from '../../Images';
import { useRouter,useParams } from 'next/navigation';;
const ProductUpdatePage = () => {
    const router = useRouter();
    const { productID } = useParams<{ productID: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<Images[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const fetchProduct = async () => {

    console.log("idpro, ",productID);
    
    try{
      const response = await axios.get(`http://localhost:5000/api/products/one/${productID}`);
      setProduct(response.data);
      setImages(response.data.images);
    } catch (error) {
      console.log('Error fetching product data:', error);
    }
  };
  useEffect(() => {
   

    fetchProduct();
  }, [productID]);

  const handleUploadImages = async () => {
    const data = new FormData();
    newImages.forEach(file => {
      data.append('images', file);
    });
console.log("newimages",newImages);

    try {
await axios.post(`http://localhost:5000/api/products/add/images/${productID}`,data);
      fetchProduct();
      alert('Images uploaded successfully');
      setNewImages([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };
  const handleDeleteImage = async (imageID: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/image/${imageID}`);
      setImages(images.filter(img => img.productImageID !== imageID));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName || '');
    data.append('description', formData.description || '');
    data.append('category', formData.category || '');
    data.append('price', (formData.price || '').toString());
    data.append('status', formData.status || '');
    data.append('current_status', formData.current_status || '');
    data.append('countryID', (formData.countryID || '').toString());
    data.append('users_userID', (formData.users_userID || '').toString());

    
    console.log("data is ",data);
    
    try {
      await axios.put(`http://localhost:5000/api/products/update/${productID}`, data,);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      {product && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            defaultValue={product.productName}
            onChange={handleInputChange}
          />
          <input
            name="description"
            placeholder="Description"
            defaultValue={product.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            defaultValue={product.category}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            defaultValue={product.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            defaultValue={product.status}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="current_status"
            placeholder="Current Status"
            defaultValue={product.current_status}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="countryID"
            placeholder="Country ID"
            defaultValue={product.countryID}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="users_userID"
            placeholder="User ID"
            defaultValue={product.users_userID}
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
          />
           <button type="button" onClick={handleUploadImages}>Upload Images</button>
          <button type="submit">Update Product</button>
        </form>
      )}
      <div>
        <h3>Existing Images</h3>
        {images.map(image => (
          <div key={image.productImageID}>
            <img src={`http://localhost:5000/api/products/${image.imageURL}`} alt="Product Image" width={100} />
            <button onClick={() => handleDeleteImage(image.productImageID)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductUpdatePage;
