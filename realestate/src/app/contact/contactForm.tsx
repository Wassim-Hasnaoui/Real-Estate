// "use client";

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import emailjs from 'emailjs-com';
// import './ContactUs.css';

// const serviceId = 'service_x56kjyg';
// const templateId = 'template_usu6k3z'; // Updated template ID
// const publicKey = 'NG8Dae7FPYRUUdwCE';

// const ContactForm: React.FC = () => {
//     const [toSend, setToSend] = useState({
//         user_name: '',
//         user_email: '',
//         message: ''
//     });

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey)
//             .then((result) => {
//                 console.log('Email sent successfully!', result.text);
//                 setToSend({
//                     user_name: '',
//                     user_email: '',
//                     message: ''
//                 });
//             }, (error) => {
//                 console.error('Error sending email:', error.text);
//             });
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setToSend(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     return (
//         <form onSubmit={handleSubmit} className="ContactForm">
//             <input type="text" name="user_name" value={toSend.user_name} onChange={handleChange} placeholder="Your Name" required />
//             <input type="email" name="user_email" value={toSend.user_email} onChange={handleChange} placeholder="Your Email" required />
//             <textarea name="message" value={toSend.message} onChange={handleChange} placeholder="Your Message" required />
//             <button type="submit">Send Message</button>
//         </form>
//     );
// };

// export default ContactForm;
