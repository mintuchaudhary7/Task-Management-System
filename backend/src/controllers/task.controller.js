const Task = require("../models/Task");

/* ================= GET ALL TASKS ================= */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name")
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET TASKS BY INSTANCE ================= */
const getTasksByInstance = async (req, res) => {
  try {
    const { instanceId } = req.params;

    const tasks = await Task.find({ instanceId })
      .populate("assignedUserId", "name email role")
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE TASK STATUS ================= */
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET TASKS BY USER ================= */
const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find tasks assigned to the specific user
    const tasks = await Task.find({ assignedUserId: userId })
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name") // optional: include instance name
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTasksByInstance,
  updateTaskStatus,
  getTasksByUser,
};
