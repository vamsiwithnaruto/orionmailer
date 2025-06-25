const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { fullName, email, phone, education, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'vamsieee20@gmail.com',
    subject: 'New Course Registration',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f3f4f6; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 40px;">
          <h2 style="text-align: center; color: #065f46;">🌿 New Course Registration</h2>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Education:</strong> ${education}</p>
          <p><strong>Message:</strong><br>${message || 'N/A'}</p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://orionai.in" style="display: inline-block; padding: 12px 20px; background: #047857; color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Visit Orion AI
            </a>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Failed to send email');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
