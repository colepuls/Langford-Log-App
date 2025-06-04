# 🛠️ Langford Log App

**Built for Langford Mechanical and Sheet Metal, INC**, the Langford Log App is a mobile-friendly tool designed for foremen to submit detailed daily job logs. The app captures employee work hours, task descriptions, and photo evidence — and automatically emails the compiled log to an administrator.

---

## 🚀 Features

- ✅ Sign up and log in using Firebase Authentication
- 👷 Add up to 20 employees with custom hour input
- 📅 Record date, job number, and foreman name
- 📝 Describe daily tasks in free text
- 📸 Upload up to 20 photos (compressed for email)
- 📤 Submit the form to email all content (including attachments)
- 🌐 Backend deployed on Render

---

## 🧱 Tech Stack

**Frontend:**
- React Native (with Expo)
- Firebase Authentication
- Expo Image Picker
- React Navigation

**Backend:**
- Node.js + Express
- Multer (file upload)
- Nodemailer (emailing)
- CORS enabled
- Deployed on Render

---

## 📁 Project Structure

```
LangfordLog/
├── App.js                   # Navigation + Auth logic
├── index.js                # Expo entry point
├── firebase.js             # Firebase configuration
├── metro.config.js         # Metro bundler config for Firebase ESM
├── screens/
│   ├── LoginScreen.js      # Firebase login screen
│   ├── SignupScreen.js     # Firebase signup screen
│   └── LogEntryScreen.js   # Form submission screen
├── backend/
│   └── server.js           # Express API for sending emails
```

---

## 🔧 Setup Instructions

### 1. Prerequisites

- Node.js ≥ 16
- [Expo CLI](https://docs.expo.dev/get-started/installation/):  
  ```bash
  npm install -g expo-cli
  ```

---

### 2. Firebase Setup

Create a Firebase project and replace the config in `firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

### 3. Run the Frontend

Install dependencies and start the app:

```bash
npm install
expo start
```

Open the app on your device using the Expo Go app or run it in an emulator.

---

### 4. Backend Setup (Local or Render)

#### Local Development

1. Create a `.env` file in the backend folder:

```env
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password_or_app_password
```

2. Install and run:

```bash
cd backend
npm install
node server.js
```

The backend will run at `http://localhost:4000`.

---

#### Render Deployment

1. Push your backend to GitHub.
2. Create a new **Web Service** at [Render](https://render.com).
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `EMAIL_USER`
     - `EMAIL_PASS`
4. After deployment, grab your Render URL (e.g. `https://langford-log-app.onrender.com`).

5. Update `LogEntryScreen.js` to use your live endpoint:

```js
const response = await fetch(
  'https://langford-log-app.onrender.com/submit-log',
  { method: 'POST', body: formData }
);
```

---

## 📬 Example Email Output

```
Subject: Daily Log - 06/04/2025 - John Doe

Foreman: John Doe
Date: 06/04/2025
Job #: 12345

Employees:
1. Employee 1 - 8 hours
2. Employee 2 - 7.5 hours

Task Description:
Framed the east wall and poured foundation for HVAC units.
```

Attachments (images) are included in the email.

---

## 🔒 Authentication Notes

- Firebase Authentication handles user sessions
- Persistent auth storage uses `@react-native-async-storage/async-storage`

---

## 📌 Future Improvements

- Offline draft saving and background sync
- Admin dashboard for viewing submitted logs
- Cloud storage for photos and log history (e.g., Firebase Firestore)
- Success/failure modals instead of basic alerts
- PDF generation of logs

---

## 👨‍💻 Author

Made with care by **Cole Puls**  
GitHub: [https://github.com/colepuls](https://github.com/colepuls)

---

## 📝 License

This project is licensed under the MIT License.
