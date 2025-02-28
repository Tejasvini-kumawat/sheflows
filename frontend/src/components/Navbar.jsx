import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { FaFemale } from "react-icons/fa"; // Women icon

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setShowMenu(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Redirect user to login if they try to access protected pages
  const handleProtectedNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <header className="p-4 bg-white shadow-md relative">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="SheFlows Logo" className="w-20 ml-40" />

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-orange-600 font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() =>
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-orange-600 font-medium"
            >
              About
            </Link>
          </li>

          {/* Protected Pages: Work, Family, Hobbies, Contact */}
          <li>
            <button
              onClick={() => handleProtectedNavigation("/profile/work")}
              className="hover:text-orange-600 font-medium"
            >
              Work
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedNavigation("/profile/family")}
              className="hover:text-orange-600 font-medium"
            >
              Family
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedNavigation("/profile/hobbies")}
              className="hover:text-orange-600 font-medium"
            >
              Hobbies
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedNavigation("/contact")}
              className="hover:text-orange-600 font-medium"
            >
              Contact
            </button>
          </li>

          {/* User Login/Dropdown */}
          <li className="relative">
            {user ? (
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaFemale className="text-orange-500 text-2xl" />
                <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Login
              </Link>
            )}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
              >
                <Link
                  to="/profile"
                  onClick={() => setShowMenu(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
