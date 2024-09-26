const { User, RecentActivity } = require("../models");
const bcrypt = require("bcrypt");

class UserController {

    async createUser(req, res) {
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
                role
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

    async createAdminUser(username, email, password) {
        try {


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
                role: "admin",
            });

            // Create recent activity
            await RecentActivity.create({
                message: `New user signed up: ${username}`,
                icon: "👤",
                action: "new_user",
            });
            console.log("Admin created Successfully")
        } catch (error) {
            console.log("Admin Not created Successfully", error)
        }
    }

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get user by ID
    async getUserById(req, res) {
        try {
            const { userId } = req.params;

            // Retrieve user by ID
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
    async getUserRole(req, res) {
        try {
            const { userId } = req.params;
            const { role } = req.body;

            // Retrieve user by ID
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.role = role || user.role;
            await user.save();

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Update user
    async updateUser(req, res) {
        try {
            const { userId } = req.params;
            const { username, email, role } = req.body;

            // Find user by ID
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Update user details
            user.username = username || user.username;
            user.email = email || user.email;
            user.role = role || user.role;

            await user.save();

            res.status(200).json({ message: "User updated successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Delete user
    async deleteUser(req, res) {
        try {
            const { userId } = req.params;

            // Find user by ID
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Delete user
            await user.destroy();

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}

module.exports = new UserController();