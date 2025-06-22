# Email Setup Guide

## Problem
The current email setup was causing issues when different users (colepuls@me.com vs brian@langfordmechanical.com) tried to submit logs. The iCloud SMTP server was trying to send emails "from" different addresses, which caused authentication failures.

## Solution
Switched to Gmail SMTP which is more reliable and supports proper authentication.

## Setup Instructions

### 1. Create a Gmail Account (if you don't have one)
- Create a new Gmail account specifically for sending logs (e.g., `langfordlogs@gmail.com`)
- This will be the account that sends all emails

### 2. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication on the Gmail account

### 3. Generate an App Password
- Go to Google Account settings → Security
- Under "2-Step Verification", click "App passwords"
- Select "Mail" and "Other (Custom name)"
- Name it "Langford Log App"
- Copy the generated 16-character password

### 4. Update Environment Variables
Set these environment variables on your server (Render, Heroku, etc.):

```env
EMAIL_USER=langfordlogs@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### 5. For Local Development
Create a `.env` file in the backend folder:

```env
EMAIL_USER=langfordlogs@gmail.com
EMAIL_PASS=your_16_character_app_password
```

## How It Works Now

1. **Any user can log in** with their own email (colepuls@me.com, brian@langfordmechanical.com, etc.)
2. **All emails are sent from** the configured Gmail account (langfordlogs@gmail.com)
3. **The user's email is included** in the email body as "Submitted by: [userEmail]"
4. **No authentication issues** because we're always using the same SMTP credentials

## Benefits

✅ **Works for all users** - Any authenticated user can submit logs  
✅ **Reliable delivery** - Gmail SMTP is more reliable than iCloud  
✅ **Better error handling** - More detailed error messages  
✅ **User tracking** - Still know which user submitted each log  
✅ **No authentication conflicts** - Single SMTP account for all emails  

## Testing

After setup, test with both email addresses:
- colepuls@me.com
- brian@langfordmechanical.com

Both should now successfully send emails when submitting logs. 