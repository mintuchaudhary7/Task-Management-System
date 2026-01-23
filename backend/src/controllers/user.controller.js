const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP ================= */
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    user.password = undefined;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token: token,
        user: user,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET USERS ================= */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // "DOER" or "ADMIN"
    });

    user.password = undefined; // remove password from response

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  createUser,
};
