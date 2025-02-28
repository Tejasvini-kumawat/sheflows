import React from "react";
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Placeholder from '../assets/placeholder-image.webp'
import { FaClock, FaUsers, FaPaintBrush } from "react-icons/fa";

const Homepage = () => {
  return (
    <div className="font-sans bg-gray-100">
      {/* Navbar */}
      <Navbar />
 {/* Hero Section */}
      <HeroSection/>
      <section
  id="about"
  className="text-center p-12 bg-gradient-to-b from-orange-50 via-white to-orange-50"
>
  <h2 className="text-3xl font-bold text-orange-700">
    Empowering Women in Work, Family, and Hobbies
  </h2>
  <p className="text-gray-700 max-w-2xl mx-auto mt-3">
    Achieve the perfect work-life balance with{" "}
    <span className="text-orange-500 font-semibold">SheFlows</span>.
  </p>

  {/* Features Section */}
  <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-8">
    {/* Work Schedule */}
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <FaClock className="text-orange-600 text-4xl mb-3" />
      <h3 className="font-bold text-lg text-gray-900">Flexible Work Schedules</h3>
      <p className="text-gray-700 mt-2 text-sm">Easily manage your work schedule.</p>
    </div>

    {/* Family Support */}
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <FaUsers className="text-orange-600 text-4xl mb-3" />
      <h3 className="font-bold text-lg text-gray-900">Family Support</h3>
      <p className="text-gray-700 mt-2 text-sm">Balance family commitments effectively.</p>
    </div>

    {/* Hobby Inspiration */}
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <FaPaintBrush className="text-orange-600 text-4xl mb-3" />
      <h3 className="font-bold text-lg text-gray-900">Hobby Inspiration</h3>
      <p className="text-gray-700 mt-2 text-sm">Find new hobbies to enjoy.</p>
    </div>
  </div>
</section>

      {/* Success Stories */}
      <section className="text-center p-10 bg-orange-50">
  <h2 className="text-3xl font-bold text-orange-600">Success Stories</h2>
  <p className="text-gray-700 max-w-2xl mx-auto mt-2">
    Discover how SheFlows has helped women balance work, family, and passions effortlessly.
  </p>

  <div className="flex flex-col md:flex-row justify-center mt-8 gap-6">
    {/* Story 1 */}
    <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-orange-500 max-w-sm bounce">
      <p className="text-gray-700 italic">
        "With SheFlows, I was able to plan my work tasks and still spend quality time with my kids. 
        The scheduling feature is a game-changer!"
      </p>
      <h4 className="mt-4 font-bold text-orange-600">Sophia Patel</h4>
      <span className="text-gray-600 text-sm">Marketing Manager & Mother of Two</span>
    </div>

    {/* Story 2 */}
    <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-orange-500 max-w-sm bounce">
      <p className="text-gray-700 italic">
        "Balancing a start-up and my personal life felt impossible, but SheFlows helped me organize my priorities. 
        Now, I have time for both business and self-care!"
      </p>
      <h4 className="mt-4 font-bold text-orange-600">Riya Sharma</h4>
      <span className="text-gray-600 text-sm">Entrepreneur & Yoga Enthusiast</span>
    </div>

    {/* Story 3 */}
    <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-orange-500 max-w-sm bounce">
      <p className="text-gray-700 italic">
        "Juggling my career and passion for painting seemed overwhelming. Thanks to SheFlows, I now schedule 
        dedicated time for work and creativity without stress."
      </p>
      <h4 className="mt-4 font-bold text-orange-600">Aisha Khan</h4>
      <span className="text-gray-600 text-sm">Software Engineer & Artist</span>
    </div>
  </div>
</section>


      {/* Community Section */}
      <section className=" px-40 flex flex-col md:flex-row items-center justify-between p-12 bg-orange-50 rounded-lg shadow-md">
  {/* Left Content */}
  <div className="max-w-lg text-center md:text-left">
    <h2 className="text-3xl font-bold text-orange-600">Join Our Community</h2>
    <p className="text-gray-700 mt-2 text-lg">
      Connect with like-minded women and find the perfect balance between work, family, and hobbies.
    </p>
    <button className="bg-orange-500 text-white px-6 py-3 rounded-md mt-6 hover:bg-orange-600 transition-all shadow-md">
      Get Started
    </button>
  </div>

  {/* Right Side - Image with Orange Box */}
  <div className="relative w-full max-w-md mt-6 md:mt-0 flex justify-center">
    <div className="bg-orange-500 rounded-lg w-72 h-72 flex justify-center items-center shadow-lg">
      <img src={Placeholder} alt="Community" className="w-4/5 object-cover drop-shadow-lg" />
    </div>
  </div>
</section>

    </div>
  );
};

export default Homepage;
