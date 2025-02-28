import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import ProfilePage from "./pages/Profile/ProfilePage";
import WorkPage from "./pages/Profile/WorkPage";
import FamilyPage from "./pages/Profile/FamilyPage";
import HobbiesPage from "./pages/Profile/HobbiesPage";
import CalendarPage from "./pages/Profile/CalendarPage";
import ChatbotPage from "./pages/Chatbot/ChatbotPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
       {/* Nested Routes for the Profile Page */}
       <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="family" element={<FamilyPage />} />
          <Route path="hobbies" element={<HobbiesPage />} />
          <Route path="calendar" element={<CalendarPage/>} />
        </Route>
    </Routes>
  );
};

export default App;
