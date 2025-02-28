// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";

const LoginPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { loginUser } = useContext(AuthContext);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine endpoint based on mode
    const endpoint = isNewUser 
      ? `${backendUrl}/api/auth/signup` 
      : `${backendUrl}/api/auth/login`;

    // Create a new FormData instance
    const data = new FormData();
    if (isNewUser) {
      data.append("name", formData.name);
    }
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await axios.post(endpoint, data);
      const responseData = response.data;

      // Store token in localStorage for future requests
      localStorage.setItem("token", responseData.token);
      // Update AuthContext with user data
      loginUser(responseData.user);
      // Redirect to home page
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error:", error.response.data.error);
      } else {
        console.error("Submission error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isNewUser ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input (only for signup) */}
          {isNewUser && (
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          )}
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-all"
          >
            {isNewUser ? "Sign Up" : "Login"}
          </button>
        </form>
        {/* Toggle between Login and Sign Up */}
        <div className="mt-4 text-center">
          <p>
            {isNewUser ? "Already have an account?" : "New here?"}{" "}
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-orange-500 font-semibold hover:underline"
            >
              {isNewUser ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
