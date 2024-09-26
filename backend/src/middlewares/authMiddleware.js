// backend/src/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findOne({ where: { id: decodedToken.userId } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach the user object to the request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { authenticateUser };
