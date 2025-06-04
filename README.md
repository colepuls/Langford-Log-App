# 📋 Langford Log App

The Langford Log App is a mobile app for foremen to submit daily job logs, including worker names, hours worked, descriptions of work completed, and optional photo attachments. Logs are emailed to an admin address upon submission.

---

## 🔧 Tech Stack

- **Frontend**: React Native (with Expo), Firebase Authentication
- **Backend**: Node.js, Express, Nodemailer, Multer (for file upload)
- **Deployment**: Render (Backend API)

---

## 📱 Features

- Signup/Login with Firebase Auth
- Submit a daily log:
  - Foreman name, date, job number
  - Add up to 20 employees with work hours
  - Attach up to 20 images
- Automatically sends a formatted email with attachments
- Responsive UI using React Native components
- Data persistence via `local` state and Firebase session handling

---

## 📂 Project Structure

```bash
.
├── App.js                 # App entry point and navigation setup
├── index.js              # Expo entry point
├── firebase.js           # Firebase initialization
├── screens/
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   └── LogEntryScreen.js
├── server.js             # Express backend for log submission and email
├── metro.config.js       # Metro bundler config to support Firebase ESM
└── uploads/              # Temporary upload folder used by multer
🚀 Setup Instructions
1. Firebase Setup (Frontend)
Ensure you have a Firebase project set up and update the firebaseConfig in firebase.js.

js
Copy
Edit
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: '...',
  appId: '...',
};
2. Running the Frontend
You must have Node.js and Expo CLI installed:

bash
Copy
Edit
npm install -g expo-cli
npm install
expo start
3. Running the Backend Locally
Install dependencies and start the server:

bash
Copy
Edit
cd backend
npm install
node server.js
Make sure to create a .env file for environment variables:

env
Copy
Edit
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password_or_app_password
🌍 Deploying Backend to Render
Push your backend code to GitHub

Go to render.com and create a new Web Service

Set the following Render configuration:

Environment: Node

Build Command: npm install

Start Command: node server.js

Environment Variables:

EMAIL_USER

EMAIL_PASS

Set up CORS: Your frontend will make requests to this endpoint, so CORS is enabled in server.js.

Update the frontend API endpoint

In LogEntryScreen.js, change the fetch URL to your Render-deployed backend endpoint:

js
Copy
Edit
fetch('https://your-backend.onrender.com/submit-log', ...)
📧 Email Format Example
text
Copy
Edit
Subject: Daily Log - 06/01/2025 - John Doe

Foreman: John Doe
Date: 06/01/2025
Job #: 172

Employees:
1. Employee 1 - 8 hours
2. Employee 2 - 7 hours
...

Task Description:
Completed framing for unit #3 and started on roofing.
Attached photos will be included in the email as JPEG attachments.

✅ To-Do / Enhancements
Add error/success modals instead of alert()

Store past logs in Firebase Firestore

Offline-first data saving with background sync

Admin web dashboard to view logs

🙌 Author
Built by Cole Puls
GitHub: @colepuls
