// server.js
require('dns').setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// -------- Email via HTTPS API (Resend) --------
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// -------- App setup --------
const app = express();
const upload = multer({ dest: 'uploads/' }); // ephemeral on Render is fine

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check (Render pings this sometimes)
app.get('/health', (_req, res) => res.status(200).send('OK'));
app.get('/', (_req, res) => res.status(200).send('Langford Log API running'));

// -------- Helpers --------
function safeParseEmployees(employeesRaw) {
  try {
    if (!employeesRaw) return [];
    const parsed = JSON.parse(employeesRaw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildHtml({ userEmail, foreman, foremanHours, date, jobNumber, employees, taskDescription }) {
  const employeesHtml = employees.length
    ? employees.map((e, i) => `${i + 1}. ${e.name || 'N/A'} - ${e.hours || 0} hours`).join('<br>')
    : 'None';

  return `
    <div>
      <p><b>Submitted by:</b> ${userEmail || 'N/A'}</p>
      <p><b>Foreman:</b> ${foreman || 'N/A'} - ${foremanHours || 0} hours</p>
      <p><b>Date:</b> ${date || 'N/A'}</p>
      <p><b>Job #:</b> ${jobNumber || 'N/A'}</p>
      <p><b>Employees:</b><br>${employeesHtml}</p>
      <p><b>Task Description:</b><br>${(taskDescription || '').replace(/\n/g, '<br>')}</p>
    </div>
  `;
}

function buildText({ userEmail, foreman, foremanHours, date, jobNumber, employees, taskDescription }) {
  const employeesText = employees.length
    ? employees.map((e, i) => `${i + 1}. ${e.name || 'N/A'} - ${e.hours || 0} hours`).join('\n')
    : 'None';

  return [
    `Submitted by: ${userEmail || 'N/A'}`,
    `Foreman: ${foreman || 'N/A'} - ${foremanHours || 0} hours`,
    `Date: ${date || 'N/A'}`,
    `Job #: ${jobNumber || 'N/A'}`,
    '',
    'Employees:',
    employeesText,
    '',
    'Task Description:',
    taskDescription || ''
  ].join('\n');
}

// -------- Main route (unchanged contract) --------
app.post('/submit-log', upload.array('photos', 20), async (req, res) => {
  const {
    foreman,
    foremanHours,
    date,
    jobNumber,
    employees,
    taskDescription,
    userEmail
  } = req.body;

  const parsedEmployees = safeParseEmployees(employees);

  // Convert uploads into Resend-style attachments (filename + Buffer)
  const fileEntries = Array.isArray(req.files) ? req.files : [];
  const attachments = fileEntries.map(f => ({
    filename: f.originalname || path.basename(f.path),
    content: fs.readFileSync(f.path) // Buffer
  }));

  const mailFrom = process.env.MAIL_FROM;
  const mailTo = process.env.MAIL_TO || 'kayla@langfordmechanical.com';

  const subject = `Daily Log - ${date || 'Unknown Date'} - ${foreman || 'Unknown Foreman'}`;
  const html = buildHtml({ userEmail, foreman, foremanHours, date, jobNumber, employees: parsedEmployees, taskDescription });
  const text = buildText({ userEmail, foreman, foremanHours, date, jobNumber, employees: parsedEmployees, taskDescription });

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }
    if (!mailFrom) {
      throw new Error('MAIL_FROM is not set (must be a verified domain/sender in Resend)');
    }

    await resend.emails.send({
      from: mailFrom,
      to: [mailTo],
      subject,
      html,
      text,
      attachments
    });

    console.log('Email sent successfully to:', mailTo, 'from:', mailFrom);
    res.json({ success: true });
  } catch (err) {
    console.error('Email failed:', err);
    res.status(500).json({ error: 'Failed to send email: ' + (err?.message || 'Unknown error') });
  } finally {
    // Clean up uploaded files
    for (const f of fileEntries) {
      try { fs.unlinkSync(f.path); } catch {}
    }
  }
});

// -------- Start server --------
const PORT = process.env.PORT || 4000; // Render sets PORT
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
