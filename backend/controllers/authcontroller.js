const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const isValidEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

const isStrongPassword = (password) => {
  return password.length >= 6;
};

async function signup(req, res) {
  const { fullName, email, password, confirmPassword } = req.body;

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user: { fullName: user.fullName, email: user.email } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { fullName: user.fullName, email: user.email } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed. Try again later." });
  }
}

module.exports = { signup, login };
