const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getUsers,
  createUser,
} = require("../controllers/user.controller");
const isAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUsers);

// Admin-only route to create a new user
router.post("/admin/users", createUser);

module.exports = router;
