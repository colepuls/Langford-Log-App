# 🏗️ Langford Log - Daily Job Tracking App

**Built for Langford Mechanical & Sheetmetal, INC**

A professional mobile application designed for construction foremen to efficiently submit detailed daily job logs, track employee hours, and maintain comprehensive project documentation with photo evidence.

---

## 📱 App Overview

The Langford Log app streamlines the daily reporting process for construction foremen by providing an intuitive mobile interface to:
- Record employee work hours and job details
- Capture photo documentation of work progress
- Submit comprehensive daily logs via email
- Maintain secure authentication for authorized users

**Platforms:** iOS & Android  
**Target Users:** Construction Foremen  
**Primary Use Case:** Daily job site reporting and time tracking

---

## 🎥 App Demo

[![App Demo](https://img.youtube.com/vi/lHF7pt2mtyU/0.jpg)](https://www.youtube.com/shorts/lHF7pt2mtyU)

*Demo video showing the complete workflow from login to log submission*

---

## ✨ Key Features

### 🔐 Secure Authentication
- Firebase Authentication integration
- User registration and login system
- Persistent session management
- Role-based access control

### 📋 Daily Log Management
- **Employee Tracking:** Add up to 20 employees with custom hour inputs
- **Job Information:** Record date, job number, and foreman details
- **Task Documentation:** Detailed free-text descriptions of daily work
- **Photo Evidence:** Upload up to 20 photos with automatic compression
- **Email Submission:** Automated email delivery with all content and attachments

### 📸 Photo Documentation
- Camera integration for on-site photo capture
- Photo library access for existing images
- Automatic image compression for email delivery
- Support for multiple photo uploads per log entry

### 📧 Automated Reporting
- Instant email delivery to administrators
- Formatted log summaries with employee hours
- Photo attachments included in email
- Professional email formatting

---

## 🛠️ Technical Architecture

### Frontend (React Native + Expo)
- **Framework:** React Native with Expo SDK 53
- **Navigation:** React Navigation v7
- **Authentication:** Firebase Auth
- **Image Handling:** Expo Image Picker & Camera
- **State Management:** React Hooks
- **UI Components:** Custom components with modern design

### Backend (Node.js + Express)
- **Runtime:** Node.js with Express.js
- **File Upload:** Multer for image handling
- **Email Service:** Nodemailer for automated email delivery
- **CORS:** Cross-origin resource sharing enabled
- **Deployment:** Render cloud platform

### Database & Storage
- **Authentication:** Firebase Authentication
- **File Storage:** Local processing with email delivery
- **Session Management:** AsyncStorage for persistent login

---

## 📁 Project Structure

```
langford-log/
├── frontend/                    # React Native App
│   ├── App.js                  # Main app navigation
│   ├── index.js                # Expo entry point
│   ├── firebase.js             # Firebase configuration
│   ├── app.json                # Expo app configuration
│   ├── package.json            # Frontend dependencies
│   ├── assets/                 # App icons and images
│   │   ├── icon.png
│   │   ├── adaptive-icon.png
│   │   ├── splash-icon.png
│   │   └── langford-logo.jpg
│   └── screens/                # App screens
│       ├── LoginScreen.js      # User authentication
│       ├── SignupScreen.js     # User registration
│       ├── LogEntryScreen.js   # Main log submission form
│       └── AdminScreen.js      # Admin dashboard
├── backend/                    # Node.js API Server
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   └── uploads/               # Temporary file storage
├── firestore.rules            # Firebase security rules
├── seedFirestone.js           # Database seeding script
└── README.md                  # This file
```

---

## 📱 App Usage Guide

### For Foremen

1. **Login/Registration**
   - Download the app from App Store/Google Play
   - Create an account or login with existing credentials
   - Authentication is handled securely through Firebase

2. **Submitting Daily Logs**
   - Tap "New Log Entry" to start a new daily report
   - Enter job number and select the current date
   - Add employee names and their respective work hours
   - Describe the day's tasks and progress
   - Take photos or select from gallery (up to 20 images)
   - Review and submit the log

3. **Photo Documentation**
   - Use the camera to capture work progress
   - Select existing photos from your device
   - Photos are automatically compressed for email delivery
   - Multiple photos can be attached to each log entry

### For Administrators

- Daily logs are automatically emailed to configured addresses
- Each email includes:
  - Foreman name and contact information
  - Job number and date
  - Complete employee hour breakdown
  - Detailed task descriptions
  - All photo attachments

---

## 🔒 Security & Privacy

- **Authentication:** Secure Firebase Authentication
- **Data Protection:** No sensitive data stored locally
- **Photo Privacy:** Images processed locally and sent via secure email
- **User Sessions:** Persistent login with secure token management
- **API Security:** CORS protection and input validation

---

## 📧 Email Output Example

```
Subject: Daily Log - 06/04/2025 - John Smith

Foreman: John Smith
Date: 06/04/2025
Job #: 12345

Employees:
1. Mike Johnson - 8.0 hours
2. Sarah Davis - 7.5 hours
3. Tom Wilson - 8.0 hours

Task Description:
Completed HVAC ductwork installation on the east wing. 
Installed 3 air handlers and connected ductwork to main trunk line. 
All equipment tested and operational. Ready for final inspection.

[Photo attachments included]
```

---

## 🛠️ Development & Maintenance

### Code Quality
- Modern React Native patterns
- Component-based architecture
- Error handling and validation
- Responsive design for various screen sizes

### Performance Optimizations
- Image compression for email delivery
- Efficient state management
- Optimized bundle size
- Background processing for file uploads

### Future Enhancements
- [ ] Offline capability with sync
- [ ] Admin dashboard for log review
- [ ] Cloud storage for photo archives
- [ ] PDF report generation
- [ ] Push notifications for log reminders
- [ ] GPS location tracking
- [ ] Digital signature integration

---

## ✍️ Author

**Developer:** Cole Puls  
**GitHub:** [https://github.com/colepuls](https://github.com/colepuls)

---

## 📄 License

This project is proprietary software developed for Langford Mechanical & Sheetmetal, INC. All rights reserved.

---

## 🏢 About Langford Mechanical & Sheetmetal, INC

Langford Mechanical & Sheetmetal, INC is a leading construction and mechanical services company specializing in HVAC, sheet metal fabrication, and mechanical contracting services. This app was developed to streamline their daily reporting processes and improve project documentation efficiency.

---
