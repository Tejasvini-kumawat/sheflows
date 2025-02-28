// src/pages/Profile/ProfilePage.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";

const ProfilePage = () => {
  const { user, loginUser } = useContext(AuthContext);
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "", // holds the URL if available
    age: "",
    mobile: "",
    profession: "",
    dateOfBirth: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the latest profile data from the DB whenever this page loads.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${backendUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data && res.data.profile) {
            // Update AuthContext and local formData with the latest profile from the DB
            loginUser(res.data.profile);
            setFormData({
              name: res.data.profile.name || "",
              email: res.data.profile.email || "",
              bio: res.data.profile.bio || "",
              profileImage: res.data.profile.profileImage || "",
              age: res.data.profile.age || "",
              mobile: res.data.profile.mobile || "",
              profession: res.data.profile.profession || "",
              dateOfBirth: res.data.profile.dateOfBirth
                ? res.data.profile.dateOfBirth.substring(0, 10)
                : "",
            });
          }
        })
        .catch((err) =>
          console.error("Error fetching updated profile:", err.response ? err.response.data : err)
        );
    }
  }, [backendUrl, loginUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData instance to send text fields and file
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    data.append("age", formData.age);
    data.append("mobile", formData.mobile);
    data.append("profession", formData.profession);
    data.append("dateOfBirth", formData.dateOfBirth);

    // If a new file is selected, append it; otherwise, send the existing URL
    if (profileImageFile) {
      data.append("profileImage", profileImageFile);
    } else {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const response = await axios.put(`${backendUrl}/api/profile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Update AuthContext with the new profile data
      loginUser(response.data.profile);
      setMessage("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Profile update error:", error.response ? error.response.data : error);
      setMessage("Error updating profile");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bg-orange-200 opacity-30 rounded-full"
          style={{
            width: "150px",
            height: "150px",
            top: "10%",
            left: "15%",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-orange-300 opacity-30 rounded-full"
          style={{
            width: "200px",
            height: "200px",
            top: "60%",
            left: "70%",
            animation: "float 8s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-orange-100 opacity-30 rounded-full"
          style={{
            width: "120px",
            height: "120px",
            top: "80%",
            left: "30%",
            animation: "float 10s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* Main Profile Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 border border-orange-100 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">
          Your Profile
        </h1>
        <div className="flex flex-col items-center">
          {/* Animated Profile Image */}
          <div className="relative">
            <img
              src={
                profileImageFile
                  ? URL.createObjectURL(profileImageFile)
                  : formData.profileImage || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-2xl"
            />
          </div>

          {editing ? (
            <form
              onSubmit={handleUpdate}
              className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
            >
              <div className="grid grid-cols-1 gap-4">
                {/* Form Fields */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    accept="image/*"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Work/Profession
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your profession"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              {message && (
                <p className="mt-4 text-center text-green-600 font-medium">
                  {message}
                </p>
              )}
            </form>
          ) : (
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>Name:</strong> {formData.name}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="text-lg">
                  <strong>Bio:</strong> {formData.bio || "N/A"}
                </p>
                <p className="text-lg">
                  <strong>Age:</strong> {formData.age || "N/A"}
                </p>
                <p className="text-lg">
                  <strong>Mobile Number:</strong> {formData.mobile || "N/A"}
                </p>
                <p className="text-lg">
                  <strong>Profession:</strong> {formData.profession || "N/A"}
                </p>
                <p className="text-lg">
                  <strong>Date of Birth:</strong>{" "}
                  {formData.dateOfBirth || "N/A"}
                </p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inline styles for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
