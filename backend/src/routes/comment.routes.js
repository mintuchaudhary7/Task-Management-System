const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  addComment,
  getTaskComments,
} = require("../controllers/comment.controller");

// Add comment
router.post("/:taskId", auth, addComment);

// Get all comments of a task
router.get("/:taskId", auth, getTaskComments);

module.exports = router;
