# SheFlows Project


SheFlows is a comprehensive web application designed to empower women by seamlessly integrating work, family, and personal interests into one intuitive platform. It helps users manage daily tasks through smart scheduling, a unified calendar, and an AI-powered chatbot that delivers tailored, empathetic advice.

## Features

- **User Authentication & Profile Management**
  - Secure sign-up, login, and profile update.
  - Upload profile images using Cloudinary.

- **Task & Activity Management**
  - Separate modules for managing work, family, and self-care (hobbies).
  - Input start and end times with automatic duration calculations.
  - Weekly summaries of time spent on tasks.

- **Unified Calendar**
  - Aggregates events from work, family, and self-care modules into a single calendar view.
  - Color-coded events indicate task status.
  - Built using React Big Calendar.

- **AI-Powered Chatbot**
  - Leverages Google AI Studio (Gemini-1.5-flash model) to answer questions about work-life balance.
  - Tailored system prompt to provide women-specific advice.
  - Chat interface built with React and React Markdown for rich text formatting.

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, React Big Calendar, React Markdown
- **Backend:** Node.js, Express, Axios
- **Database:** MongoDB Atlas
- **Cloud Storage:** Cloudinary
- **AI Integration:** Google AI Studio

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Google AI Studio API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sheflows.git
   cd sheflows
