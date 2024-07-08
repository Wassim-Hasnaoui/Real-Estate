"use client";

import React from 'react';
import './AboutUs.css';
import Navbar from '../navbar';

const AboutUs: React.FC = () => {
    return (
        <div className="AboutUs">
            <Navbar/>
            <h1>About Us</h1>
            <section className="mission">
                <h2>Our Mission</h2>
                <div className="content">
                    <p>
                        Our mission is to make the process of buying, selling, and renting real estate properties as seamless and efficient as possible. We strive to provide our users with the best tools and resources to help them achieve their real estate goals.
                    </p>
                    <div className="image-container">
                        <img src="/images/mission (1).jpg" alt="Our Mission" className="animated-image" />
                    </div>
                </div>
            </section>
            <section className="vision">
                <h2>Our Vision</h2>
                <div className="content">
                    <p>
                        We envision a world where everyone can find their perfect home with ease. Our platform aims to connect buyers, sellers, and renters in a secure and user-friendly environment, promoting transparency and trust in every transaction.
                    </p>
                    <div className="image-container">
                        <img src="/images/Skyline-4582510_1920 (1).jpg" alt="Our Vision" className="animated-image" />
                    </div>
                </div>
            </section>
            <section className="values">
                <h2>Our Values</h2>
                <div className="content">
                    <ul>
                        <li>Integrity: We uphold the highest standards of integrity in all our actions.</li>
                        <li>Innovation: We constantly seek innovative solutions to improve the user experience.</li>
                        <li>Customer Focus: Our customers are at the heart of everything we do.</li>
                        <li>Excellence: We strive for excellence in every aspect of our business.</li>
                    </ul>
                    <div className="image-container">
                        <img src="/images/handshake (1).jpg" alt="Our Values" className="animated-image" />
                    </div>
                </div>
            </section>
            <section className="team">
                <h2>Our Team</h2>
                <div className="content">
                    <p>
                        We are a team of passionate real estate professionals, developers, and designers dedicated to making the real estate market more accessible and efficient for everyone.
                    </p>
                    <div className="image-container">
                        <img src="/images/people-2569234_640.jpg" alt="Our Team" className="animated-image" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;