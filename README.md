# 💫 SheFlows

[![Live Demo](https://img.shields.io/badge/View_Live-SheFlows-brightgreen?style=for-the-badge&logo=vercel)](https://sheflows.vercel.app)

**SheFlows** is a comprehensive web application designed to empower women by seamlessly integrating work, family, and personal interests into one intuitive platform. It helps users manage daily tasks through smart scheduling, a unified calendar, and an AI-powered chatbot that delivers tailored, empathetic advice.

---

## ✨ Features

### 🔐 User Authentication & Profile Management
- Secure sign-up and login system
- Profile updates with image upload support via Cloudinary

### 📋 Task & Activity Management
- Dedicated modules for **Work**, **Family**, and **Self-Care (Hobbies)**
- Time-based inputs with automatic duration calculations
- Weekly usage summaries for reflection and planning

### 📅 Unified Calendar
- Centralized view of all events from all modules
- Color-coded task categories
- Built using **React Big Calendar**

### 🤖 AI-Powered Chatbot
- Integrated with **Google AI Studio (Gemini-1.5-flash)**
- Offers tailored, empathetic suggestions for achieving balance
- Built with React Markdown for enhanced message formatting

---

## 🧱 Tech Stack

| Area        | Technologies Used                                                                 |
|-------------|------------------------------------------------------------------------------------|
| Frontend    | React, Vite, React Router, Tailwind CSS, React Markdown, React Big Calendar       |
| Backend     | Node.js, Express, Axios                                                            |
| Database    | MongoDB Atlas                                                                      |
| Cloud Storage | Cloudinary (for profile images)                                                  |
| AI Integration | Google AI Studio (Gemini 1.5 Flash)                                              |

---

## 🚀 Live Demo

🔗 **Frontend:** [https://sheflows.vercel.app](https://sheflows.vercel.app)  
🔗 **Backend:** [https://sheflows-backend.vercel.app](https://sheflows-backend.vercel.app)

---

## 🛠 Getting Started

### 🔧 Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Google AI Studio API Key

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Tejasvini-kumawat/sheflows.git
cd sheflows
```
### 2️⃣ Install dependencies for frontend and backend
```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
```
## 🔐 Environment Variables
### Backend
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_AI_API_KEY=your_google_ai_api_key
```
### Frontend
```bash
VITE_BACKEND_URL=https://sheflows-backend.vercel.app
```
 ## ▶️ Running the App Locally

 ### Backend:
```bash
# For Backend
cd backend
npm run dev
```
 ### Frontend:
```bash
# For frontend
cd frontend
npm run dev
```

## 📌 Folder Structure
```bash
sheflows/
├── frontend/          # Frontend (React + Vite)
│   ├── src/
│   └── public/
├── backend/          # Backend (Node + Express)
│   └── routes/
│   └── controllers/
├── README.md


```
### 💡 Future Improvements

- ⏰ Push Notifications  
- 🗓️ Daily Reminders  
- 🔄 Calendar Sync with Google Calendar  
- 👥 Role-Based Dashboards (e.g., Admin, Member)


---

### 🙋‍♀️ Author

**Tejasvini Kumawat**  
🔗 [GitHub Profile](https://github.com/Tejasvini-kumawat)  
📫 [tejasvini.kumawat2004@gmail.com](mailto:tejasvini.kumawat2004@gmail.com)



