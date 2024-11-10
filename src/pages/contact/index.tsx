import React, { useState } from 'react';
import Nav from '@/components/nav'; // Import Nav component
import Footer from '@/components/footer'; // Import Footer component

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const webhookUrl = 'https://discord.com/api/webhooks/1305086166512570409/TD8Pndr6315bpSrxrefFy6IKbVEFXrjZOgCfwg5KQOtNXNInh8kwB3gT6qYomueM1xpv'; // Replace with your Discord webhook URL

        const payload = {
            content: `New contact form submission:
            **First Name:** ${formData.firstName}
            **Last Name:** ${formData.lastName}
            **Company:** ${formData.company}
            **Email:** ${formData.email}
            **Phone Number:** ${formData.phoneNumber}
            **Message:** ${formData.message}`
        };

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        alert('Your message has been sent!');
        setFormData({
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            phoneNumber: '',
            message: '',
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Nav />
            <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Volt Bank</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">Please fill out the form below to report an issue or for any inquiries.</p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-black">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3.5 py-2 shadow-sm ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-black">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3.5 py-2 shadow-sm ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold text-black">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3.5 py-2 shadow-sm ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-red-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3.5 py-2 shadow-sm ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-green-600">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="block w-full rounded-md px-3.5 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold text-green-600">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="block w-full rounded-md px-3.5 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 focus:outline focus:outline-2 focus:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ContactForm;