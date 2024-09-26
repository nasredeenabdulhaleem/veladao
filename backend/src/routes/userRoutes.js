const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// User routes
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);
router.patch("/:userId/role", UserController.getUserRole);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

// UserController.createAdminUser("administrator", "veladao90@gmail.com", "Velada0AdmiN");

module.exports = router;
