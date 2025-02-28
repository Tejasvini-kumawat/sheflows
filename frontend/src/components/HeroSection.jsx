import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/hero-image.webp"; // Adjust path as needed
import { AuthContext } from "../context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      navigate("/chatbot");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="px-10 md:px-40 py-10 min-h-screen bg-white flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
      {/* Left Content */}
      <div className="flex-1 max-w-lg text-center md:text-left">
        <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-md">
          New
        </span>
        <h2 className="text-5xl font-bold mt-4 text-gray-900 leading-tight">
          Balance Your Work, Family, and Hobbies
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Find harmony in your daily life with{" "}
          <span className="text-orange-500 font-semibold">SheFlows Chatbot</span>.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-3">
          <input
            type="text"
            placeholder="Search anything..."
            className="border border-gray-300 rounded-md p-3 w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-all shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right Side - Image Box */}
      <div className="flex-1 flex justify-center">
        <div className="bg-orange-500 rounded-xl w-96 h-96 flex justify-center items-center shadow-lg animate-fadeInUp">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-4/5 object-cover drop-shadow-xl"
          />
        </div>
      </div>

      {/* Tailwind CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
