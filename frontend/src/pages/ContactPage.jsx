import React, { useState, useContext } from "react";
import { FaHome } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate(); // Navigation function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Show success message even before sending

    try {
      await fetch("http://localhost:5000/api/contact/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Reset form fields
      setFormData({ name: "", email: "", message: "" });

      // Hide message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Email sending failed, but showing success message anyway.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6 relative">
      {/* Home Button (Top Left) */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 text-orange-500 hover:text-orange-700 text-2xl"
      >
        <FaHome />
      </button>

      {/* User Profile (Top Right) */}
      {user && (
        <div className="absolute top-4 right-4 flex items-center">
          <img 
            src={user.profileImage || "https://via.placeholder.com/40"} 
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border border-orange-300"
          />
          <p className="ml-2 text-orange-600 font-semibold">{user.name}</p>
        </div>
      )}

      {/* Contact Form */}
      <h2 className="text-4xl font-bold text-orange-600 mb-4 text-center">Get in Touch</h2>
      <p className="text-gray-700 text-lg text-center mb-8 max-w-2xl">
        Have questions or need support? Reach out to us and we’ll be happy to help!
      </p>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        {isSubmitted ? (
          <div className="text-green-600 font-semibold text-lg text-center">
            ✅ Message Sent! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-all"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactPage;
