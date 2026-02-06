const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTasksByInstance,
  updateTaskStatus,
  getTasksByUser,
  taskDetails,
} = require("../controllers/task.controller");

const auth = require("../middlewares/auth");

router.get("/", getAllTasks);
router.get("/instance/:instanceId", getTasksByInstance);
router.patch("/:taskId/status", auth, updateTaskStatus);
router.get("/details/:taskId", auth, taskDetails);
router.get("/user/:userId", auth, getTasksByUser);

module.exports = router;
