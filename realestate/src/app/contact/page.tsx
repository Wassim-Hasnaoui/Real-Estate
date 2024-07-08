"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ContactUs.css';
import emailjs from 'emailjs-com';

const serviceId = 'service_x56kjyg';
const templateId = 'template_qr2g7ym'; // Updated template ID
const publicKey = 'NG8Dae7FPYRUUdwCE';

const ContactUs: React.FC = () => {
    const [toSend, setToSend] = useState({
        firstName: '',
        lastName: '',
        email: '',
        description: ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const templateParams = {
            from_name: `${toSend.firstName} ${toSend.lastName}`,
            from_email: toSend.email,
            message: toSend.description
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                setToSend({
                    firstName: '',
                    lastName: '',
                    email: '',
                    description: ''
                });
            }, (error) => {
                console.error('Failed to send email:', error.text);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setToSend(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="ContactUs">
            <h1><strong>Contact Us:</strong></h1>
            <form onSubmit={handleSubmit} className="ContactForm">
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={toSend.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={toSend.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={toSend.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={toSend.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;