// src/pages/Chatbot/ChatbotPage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRobot, FaHome } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../../context/AuthContext";

const ChatbotPage = () => {
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill question if provided as a query parameter.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setQuestion(query);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setConversation((prev) => [...prev, { from: "user", text: question }]);
    try {
      const res = await axios.post("/api/chat", { question });
      setConversation((prev) => [
        ...prev,
        { from: "bot", text: res.data.answer }
      ]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setConversation((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, an error occurred. Please try again." }
      ]);
    }
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Global Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <button onClick={() => navigate("/")} className="hover:text-orange-600">
          <FaHome className="text-3xl" />
        </button>
        <div className="flex items-center">
          <img
            src={user?.profileImage || "https://via.placeholder.com/40"}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border border-orange-300"
          />
          <p className="ml-2 text-lg font-medium text-orange-600">
            {user?.name || "Guest"}
          </p>
        </div>
      </header>

      {/* Chat Card */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8">
          {/* Chat Card Header */}
          <div className="flex items-center justify-center mb-4 border-b pb-4">
            <FaRobot className="text-orange-500 text-5xl mr-3" />
            <h1 className="text-4xl font-bold text-orange-600">SheFlows Chatbot</h1>
          </div>
          
          {/* Instruction Text */}
          <p className="text-center text-gray-600 mb-4">
            Ask questions about work, family, or hobbies.
          </p>

          {/* Conversation Container */}
          <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto mb-8 space-y-4">
            {conversation.length === 0 && (
              <p className="text-center text-gray-500">
                Your conversation will appear here.
              </p>
            )}
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-lg px-4 py-3 rounded-xl shadow-md ${
                    msg.from === "user"
                      ? "bg-blue-200 text-blue-900 rounded-br-none"
                      : "bg-green-200 text-green-900 rounded-bl-none"
                  }`}
                >
                  {msg.from === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-r-xl hover:bg-orange-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
