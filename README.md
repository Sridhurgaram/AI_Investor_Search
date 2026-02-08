# 🚀 AI Investor Finder

AI Investor Finder is a full-stack web application that helps users discover relevant investors and venture capital firms based on a startup’s sector and country. The system uses AI-powered inference to generate investor recommendations dynamically and presents them in a clean, modern user interface.

---

## 📌 Features

### 🔍 Core Features
- Search investors by **sector** and **country**
- AI-generated investor recommendations (no hardcoded data)
- Displays **exactly 5 investors**
- Progressive disclosure using **Show More / Show Less**

### 🎨 UI & UX
- Clean, card-based layout
- 🌙 / ☀️ Dark mode toggle with animation
- Tooltip support for better usability
- Smooth fade-in animations
- reasons showing when hovering

### 📤 Export Options
- Export investor list as **CSV**
- Export investor list as **PDF (print-ready)**

### 🛡️ Validation & Error Handling
- Inline form validation (no alert popups)
- Graceful API error handling
- Loading indicators for better user experience

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Custom CSS (no UI frameworks)
- Fetch API

### Backend
- Node.js
- Express.js
- Hugging Face Inference API
- dotenv for environment variable management

---

## 📂 Project Structure

ai-investor-finder/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── main.jsx
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sridhurgaram/AI_Investor_Search.git

cd AI_Investor_Search

 Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:
.env
HF_TOKEN=hf_your_huggingface_token_here
PORT=5000

Start the backend server:
npm start

Expected output:
✅ Server running on port 5000

3️⃣ Frontend Setup
cd frontend/frontend
npm install
npm run dev
Open the application in your browser:
http://localhost:5173

🔄 How the Application Works
1.User enters Sector and Country

2.Frontend sends a POST request to the backend

3.Backend calls the Hugging Face AI inference API

4.AI generates a list of relevant investors

5.Extracts investor names

6.Displays them as cards

7.Enables Show More / Show Less

10.Allows export as CSV and PDF
cd ai

 Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:
.env
HF_TOKEN=hf_your_huggingface_token_here
PORT=5000

Start the backend server:
npm start or node server.js

Expected output:
✅ Server running on port 5000

3️⃣ Frontend Setup
cd frontend/frontend
npm install
npm run dev
Open the application in your browser:
http://localhost:5173

🔄 How the Application Works
1.User enters Sector and Country

2.Frontend sends a POST request to the backend

3.Backend calls the Hugging Face AI inference API

4.AI generates a list of relevant investors

5.Extracts investor names

6.Give one line reason

7.Displays them as cards

8.Allows export as CSV and PDF