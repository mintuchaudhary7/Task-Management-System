const Task = require("../models/Task");
const Instance = require("../models/Instance");

/* ================= GET ALL TASKS ================= */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name role email" },
      })
      .sort({ order: 1 });

    return res.status(200).json({
      success: true,
      message: "All tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

/* ================= GET TASKS BY INSTANCE ================= */

const getTasksByInstance = async (req, res) => {
  try {
    const { instanceId } = req.params;

    const instance = await Instance.findById(instanceId);

    if (!instance) {
      return res.status(404).json({
        success: false,
        message: "Instance not found",
      });
    }

    // Admin can access everything
    if (req.user.role !== "ADMIN") {
      const isTeamMember =
        instance.team.marketer.toString() === req.user.id ||
        instance.team.reviewer.toString() === req.user.id ||
        instance.team.designer.toString() === req.user.id;

      if (!isTeamMember) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You are not part of this instance team.",
        });
      }
    }

    const tasks = await Task.find({ instanceId })
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name role email" },
      })
      .sort({ order: 1 });

    return res.status(200).json({
      success: true,
      message: "Instance tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instance tasks",
      error: error.message,
    });
  }
};

/* ================= UPDATE TASK STATUS ================= */
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "in-progress",
      "for-review",
      "changes-requested",
      "approved",
      "completed",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const task = await Task.findById(taskId).populate({
      path: "instanceId",
      populate: {
        path: "team",
        select: "marketer reviewer designer",
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const instance = task.instanceId;
    const role = req.user.role;

    let newAssignedUserId = task.assignedUserId;

    // ================= ADMIN OVERRIDE =================
    if (role === "ADMIN") {
      if (
        status === "pending" ||
        status === "in-progress" ||
        status === "changes-requested"
      ) {
        newAssignedUserId = instance.team.marketer;
      }

      if (status === "for-review") {
        newAssignedUserId = instance.team.reviewer;
      }

      if (status === "approved") {
        newAssignedUserId = instance.team.designer;
      }

      // completed => keep current assigned user
    }
    // ================= NORMAL FLOW =================
    else {
      if (status === "in-progress") {
        if (role !== "MARKETER") {
          return res
            .status(403)
            .json({ message: "Only marketer can start task" });
        }
        newAssignedUserId = instance.team.marketer;
      }

      if (status === "for-review") {
        if (role !== "MARKETER") {
          return res
            .status(403)
            .json({ message: "Only marketer can send for review" });
        }
        newAssignedUserId = instance.team.reviewer;
      }

      if (status === "changes-requested") {
        if (role !== "REVIEWER") {
          return res
            .status(403)
            .json({ message: "Only reviewer can request changes" });
        }
        newAssignedUserId = instance.team.marketer;
      }

      if (status === "approved") {
        if (role !== "REVIEWER") {
          return res
            .status(403)
            .json({ message: "Only reviewer can approve task" });
        }
        newAssignedUserId = instance.team.designer;
      }

      if (status === "completed") {
        if (role !== "DESIGNER") {
          return res
            .status(403)
            .json({ message: "Only designer can complete task" });
        }
      }
    }

    // ================= UPDATE TASK =================
    task.status = status;
    task.assignedUserId = newAssignedUserId;

    await task.save();

    const populatedTask = await Task.findById(task._id)
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name role email" },
      });

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: populatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message,
    });
  }
};

/* ================= GET TASKS BY USER ================= */
const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Security: user can only fetch their own tasks (except ADMIN)
    if (req.user.role !== "ADMIN" && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    let allowedStatuses = [];

    if (req.user.role === "MARKETER") {
      allowedStatuses = ["pending", "in-progress", "changes-requested"];
    } else if (req.user.role === "REVIEWER") {
      allowedStatuses = ["for-review"];
    } else if (req.user.role === "DESIGNER") {
      allowedStatuses = ["approved"];
    } else if (req.user.role === "ADMIN") {
      allowedStatuses = [
        "pending",
        "in-progress",
        "for-review",
        "changes-requested",
        "approved",
        "completed",
      ];
    }

    let query = {};

    if (req.user.role === "ADMIN") {
      query = {}; // admin gets all tasks
    } else {
      query = {
        $or: [
          {
            assignedUserId: userId,
            status: { $in: allowedStatuses },
          },
          {
            status: "completed", // completed visible to all roles
          },
        ],
      };
    }

    const tasks = await Task.find(query)
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name role email" },
      })
      .sort({ order: 1 });

    return res.status(200).json({
      success: true,
      message: "User tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user tasks",
      error: error.message,
    });
  }
};

const taskDetails = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate("assignedUserId", "name email role")
      .populate("instanceId", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name role email" },
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        meaasge: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task detail Fetched successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the task details",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTasksByInstance,
  updateTaskStatus,
  getTasksByUser,
  taskDetails,
};
