const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/submit-log', upload.array('photos', 20), async (req, res) => {
  const { foreman, foremanHours, date, jobNumber, employees, taskDescription, userEmail } = req.body;
  const parsedEmployees = JSON.parse(employees || '[]');

  // Use Gmail SMTP for better reliability
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });

  const attachments = req.files.map(file => ({
    filename: file.originalname,
    path: file.path,
  }));

  const mailOptions = {
    from: process.env.EMAIL_USER, // Always use the authenticated email as sender
    to: 'coleberr6@gmail.com',
    subject: `Daily Log - ${date} - ${foreman}`,
    text: `
Submitted by: ${userEmail}
Foreman: ${foreman} - ${foremanHours} hours
Date: ${date}
Job #: ${jobNumber}

Employees:
${parsedEmployees.map((e, i) => `${i + 1}. ${e.name} - ${e.hours} hours`).join('\n')}

Task Description:
${taskDescription}
    `,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully from:', userEmail);
    res.json({ success: true });
  } catch (err) {
    console.error('Email failed:', err);
    res.status(500).json({ error: 'Failed to send email: ' + err.message });
  } finally {
    // Clean up uploaded photos
    req.files.forEach(file => fs.unlink(file.path, () => {}));
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});