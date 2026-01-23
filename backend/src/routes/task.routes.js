const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTasksByInstance,
  updateTaskStatus, 
  getTasksByUser
} = require("../controllers/task.controller");

router.get("/", getAllTasks); 
router.get("/instance/:instanceId", getTasksByInstance);
router.patch("/:taskId/status", updateTaskStatus);
router.get("/:userId", getTasksByUser);

module.exports = router;
