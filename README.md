# Langford Log

A mobile application for construction foremen to submit daily job logs, track employee hours, and document work progress with photos.

## Overview

Built for Langford Mechanical & Sheetmetal, INC, this app streamlines daily reporting by allowing foremen to:

- Record employee work hours
- Document job details and tasks
- Attach photo evidence
- Submit reports via email

## Technical Stack

**Frontend:** React Native with Expo  
**Backend:** Node.js with Express  
**Authentication:** Firebase Auth  
**Deployment:** Render

## Project Structure

```
langford-log/
├── frontend/           # React Native app
│   ├── App.js
│   ├── screens/
│   └── assets/
├── backend/            # Node.js API
│   ├── server.js
│   └── uploads/
└── firestore.rules
```

## Usage

### For Foremen

1. Login with your credentials
2. Create a new log entry
3. Add employee names and hours
4. Describe the day's work
5. Attach photos
6. Submit the log

### For Administrators

Daily logs are automatically emailed with:
- Employee hour breakdown
- Task descriptions  
- Photo attachments

## Screenshots

<div align="center">
  <img src="assets/Simulator Screenshot - iPhone Xs Max - 2025-07-01 at 16.30.06.png" width="250" alt="App Screenshot 1" />
  <img src="assets/Simulator Screenshot - iPhone Xs Max - 2025-07-01 at 16.30.15.png" width="250" alt="App Screenshot 2" />
  <img src="assets/Simulator Screenshot - iPhone Xs Max - 2025-07-01 at 16.31.04.png" width="250" alt="App Screenshot 3" />
</div>

## Development

The app uses modern React Native patterns with component-based architecture. Images are compressed for email delivery, and authentication is handled securely through Firebase.

## Security

- Firebase Authentication
- CORS protection
- Input validation
- Secure token management

### Made by Cole Puls
