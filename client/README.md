# FeedbackHub — Cipher MuteX Internship Assignment

A full-stack feedback collection app built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## Project Structure

```
feedback-app/
├── src/                        # Frontend (React + Vite)
│   ├── App.jsx                 # Root component — fetches & manages feedback state
│   ├── main.jsx                # Vite entry point
│   ├── index.css               # Global styles (Outfit font, orange/dark theme)
│   ├── lib/
│   │   └── api.js              # Axios instance with base URL
│   └── components/
│       ├── FeedbackForm.jsx    # Form with validation
│       └── FeedbackList.jsx    # Dynamic list with search, pagination, delete
│
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── server.js               # Express app entry point
│   ├── .env                    # Environment variables (MONGODB_URI, PORT)
│   ├── lib/
│   │   └── db.js               # MongoDB connection via Mongoose
│   ├── models/
│   │   └── Feedback.js         # Mongoose schema/model
│   ├── controllers/
│   │   └── feedbackController.js  # getAllFeedback, submitFeedback, deleteFeedback
│   └── routes/
│       └── feedbackRoutes.js   # GET /, POST /, DELETE /:id
│
├── .env                        # Frontend env (VITE_API_URL)
├── package.json                # Frontend dependencies
├── vite.config.js
└── index.html
```

---

## Setup & Run

### 1. Backend

```bash
cd server
npm install
```

Edit `.env` and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
PORT=5000
```

Start the server:
```bash
npm run server    # development (nodemon)
# or
npm start         # production
```

Server runs at: `http://localhost:5000`

---

### 2. Frontend

```bash
# from project root
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

The `.env` file already points to the backend:
```
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/feedback` | Fetch all feedback (newest first) |
| POST | `/api/feedback` | Submit new feedback `{ name, feedback }` |
| DELETE | `/api/feedback/:id` | Delete feedback by MongoDB `_id` |

### Sample Response — POST `/api/feedback`
```json
{
  "success": true,
  "message": "Feedback submitted successfully.",
  "feedback": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Arjun Sharma",
    "feedback": "The app is very intuitive and easy to use!",
    "createdAt": "2026-04-16T10:30:00.000Z",
    "updatedAt": "2026-04-16T10:30:00.000Z"
  }
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| HTTP Client | Axios |
| Font | Outfit (Google Fonts) |

---

## Features

- ✅ React functional components + `useState` / `useEffect`
- ✅ Form validation (name min 2 chars, feedback min 10 chars)
- ✅ Real-time feedback list updates on submit
- ✅ Persistent storage in MongoDB
- ✅ Loading skeleton UI while fetching
- ✅ Search/filter feedback entries
- ✅ Pagination (5 entries per page)
- ✅ Delete entry (with backend call)
- ✅ Graceful fallback if server is offline
- ✅ MongoDB connection status indicator in navbar
- ✅ Fully responsive (mobile + desktop)
