
// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "./AppContext"; // Ensure backendUrl is defined here

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { backendUrl } = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${backendUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Fetched profile from DB:", res.data);
          // Expecting the backend to return { profile: { ... } }
          if (res.data && res.data.profile) {
            setUser(res.data.profile);
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [backendUrl]);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
