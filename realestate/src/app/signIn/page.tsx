"use client";
import React, { useState } from 'react';
import axios from "axios"
export default function userLogin () {
    const [formData, setFormData] = useState({
        userName:'',
        phone:'',
        email:'',
        password:'',
    });

    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
           console.log("formdata is",formData);
           console.log('form is ',form);
           
           
            const response = await axios.post('http://localhost:5000/api/user/register',form,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert("user created successfully");
            setFormData({
                userName:'',
                phone:'',
                email:'',
                password:'',
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Login:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />}
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}