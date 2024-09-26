const bcrypt = require("bcrypt");
const { User, RecentActivity } = require("../models"); // Hypothetical User model
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const dotenv = require("dotenv");
dotenv.config();

class AuthController {
  // User registration
  async registerUser(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });

      // Create recent activity
      await RecentActivity.create({
        message: `New user signed up: ${username}`,
        icon: "👤",
        action: "new_user",
      });

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // User login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.scope('withPassword').findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }


}

module.exports = new AuthController();