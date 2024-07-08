"use client";
import React, { useState } from 'react';
import axios from "axios";
import { motion } from 'framer-motion';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        userName:'',
        phone:'',
        email:'',
        password:'',
    });

    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        form.append('userName', formData.userName);
        form.append('phone', formData.phone);
        form.append('email', formData.email);
        form.append('password', formData.password);
        if (image) {
            form.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert("User created successfully");
            setFormData({
                userName:'',
                phone:'',
                email:'',
                password:'',
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Username:</label>
                        <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block mb-1">Phone Number:</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block mb-1">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block mb-1">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block mb-1">Profile Image:</label>
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 rounded-lg shadow-md" style={{ width: '100px', height: '100px' }} />}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Create Account</button>
                </form>
            </div>
        </motion.div>
    );
}

export default UserLogin;
