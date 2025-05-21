// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Middleware
app.use(cors());
app.use(express.json());



// Connect MongoDB (replace with your URI)
mongoose.connect("mongodb+srv://tradingbox652:rGia2BFoQrdATi67@cryptowebsite.tstfug7.mongodb.net/?retryWrites=true&w=majority&appName=CryptoWebsite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  number: String,
});

const User = mongoose.model("User", userSchema);

// Setup Nodemailer transporter (use your email credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tradingbox652@gmail.com",      // Your Gmail
    pass: "yfye mgux vrfl ldyv", // Use App Password or OAuth2
  },
});

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    // Validate input
    if (!name || !email || !password || !number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      number,
    });
    await newUser.save();

    // Send welcome email
    const mailOptions = {
      from: "tradingbox652@gmail.com", // Your Gmail address
      to: email,
      subject: "Welcome to Our Platform!",
      text: `Hello ${name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest Regards,\nYour Company`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Email error:", error);
  } else {
    console.log("Email sent: " + info.response);
  }
});


    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



// Schema for withdrawal
const withdrawalSchema = new mongoose.Schema({
  name: String,
  number: String,
  amount: Number,
  method: String,
  wallet: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

// Withdrawal API
app.post("/api/withdraw", async (req, res) => {
  try {
    const { name, number, amount, method, wallet } = req.body;

    if (!name || !number || !amount || !method || !wallet) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRequest = new Withdrawal({ name, number, amount, method, wallet });
    await newRequest.save();

    res.status(201).json({ message: "Withdrawal request saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});





const depositSchema = new mongoose.Schema({
  name: String,
  phone: String,
  method: String,
  date: { type: Date, default: Date.now },
});

const Deposit = mongoose.model("Deposit", depositSchema);

app.post("/api/deposit", async (req, res) => {
  const { name, phone, method } = req.body;

  if (!name || !phone || !method) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newDeposit = new Deposit({ name, phone, method });
    await newDeposit.save();
    res.status(201).json({ message: "Deposit recorded" });
  } catch (err) {
    console.error("Error saving deposit:", err);
    res.status(500).json({ error: "Server error" });
  }
});




app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Success — optionally create token here (or skip for now)
    res.status(200).json({ message: "Login successful", token: "dummy-token" }); // Replace with real JWT later
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
