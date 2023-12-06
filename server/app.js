// Setup server, session and middleware here.
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const configRoutes = require("./routes");
const jwtSecret = "Town_Treasures_Key";
const nodemailer = require('nodemailer');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Accept requests from both origins
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded; // Add the decoded user payload to the request
      console.log(
        new Date().toUTCString() +
          " " +
          req.method +
          " " +
          req.originalUrl +
          " Authenticated User"
      );
    } catch (err) {
      console.log(
        new Date().toUTCString() +
          " " +
          req.method +
          " " +
          req.originalUrl +
          " Non-Authenticated User"
      );
    }
  } else {
    console.log(
      new Date().toUTCString() +
        " " +
        req.method +
        " " +
        req.originalUrl +
        " Non-Authenticated User"
    );
  }
  next();
});

app.use('/uploads', express.static('./uploads'));


const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service;
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD// It's safer to use environment variables or other secure methods
  }
});
app.post('/send-email', (req, res) => {
  const { email, topic, message } = req.body;

  const mailOptions = {
      from: email,
      to: 'Town_Treasures@gmail.com',
      subject: `Contact Form Submission - ${topic}`,
      text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
      } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Email successfully sent');
      }
  });
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is now running");
});
