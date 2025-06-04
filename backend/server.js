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

app.post('/submit-log', upload.array('photos', 10), async (req, res) => {
  const { foreman, date, jobNumber, employees, taskDescription, userEmail } = req.body;
  const parsedEmployees = JSON.parse(employees || '[]');

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = req.files.map(file => ({
    filename: file.originalname,
    path: file.path,
  }));

  const mailOptions = {
    from: userEmail || process.env.EMAIL_USER,
    to: 'coleberr6@gmail.com',
    subject: `Daily Log - ${date} - ${foreman}`,
    text: `
Foreman: ${foreman}
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
    console.log('Email sent successfully.');
    res.json({ success: true });
  } catch (err) {
    console.error('Email failed:', err);
    res.status(500).json({ error: 'Failed to send email' });
  } finally {
    // Clean up uploaded photos
    req.files.forEach(file => fs.unlink(file.path, () => {}));
  }
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});