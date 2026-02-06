const Instance = require("../models/Instance");
const Template = require("../models/Template");
const Task = require("../models/Task");

/* ================= CREATE INSTANCE + AUTO TASKS ================= */
const createInstance = async (req, res) => {
  try {
    const { name, templateId, marketerId, reviewerId, designerId } = req.body;

    if (!name || !templateId || !marketerId || !reviewerId || !designerId) {
      return res.status(400).json({
        success: false,
        message:
          "Instance name, templateId, marketerId, reviewerId, and designerId are required",
      });
    }

    // fetch template
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    // create instance
    const instance = await Instance.create({
      name,
      templateId,
      createdBy: req.user.id, // admin id from token
      team: {
        marketer: marketerId,
        reviewer: reviewerId,
        designer: designerId,
      },
    });

    //  auto-generate tasks (assigned to marketer by default)
    const tasksToCreate = template.tasks.map((task) => ({
      name: task.name,
      order: task.order,
      instanceId: instance._id,
      assignedUserId: marketerId,
      status: "pending",
    }));

    await Task.insertMany(tasksToCreate);

    res.status(201).json({
      success: true,
      message: "Instance created and tasks assigned to marketer successfully",
      instance: instance,
      tasksCreated: tasksToCreate.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/* ================= GET ALL INSTANCES ================= */
const getAllInstances = async (req, res) => {
  try {
    const instances = await Instance.find()
      .populate("templateId", "name")
      .populate("createdBy", "name email role")
      .populate("team.marketer", "name email role")
      .populate("team.reviewer", "name email role")
      .populate("team.designer", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: instances.length,
      data: instances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};

/* ================= GET INSTANCE BY ID ================= */
const getInstanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const instance = await Instance.findById(id)
      .populate("templateId", "name description")
      .populate("createdBy", "name email role")
      .populate("team.marketer", "name email role")
      .populate("team.reviewer", "name email role")
      .populate("team.designer", "name email role");

    if (!instance) {
      return res.status(404).json({
        success: false,
        message: "Instance not found",
      });
    }

    // fetch tasks of this instance
    const tasks = await Task.find({ instanceId: id })
      .populate("assignedUserId", "name email role")
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      instance: instance,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error,
    });
  }
};

const getUsersInstance = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIXED (not req.user._id)

    const instances = await Instance.find({
      $or: [
        { "team.marketer": userId },
        { "team.reviewer": userId },
        { "team.designer": userId },
        { createdBy: userId }, // ✅ optional: admin also sees created instances
      ],
    })
      .populate("templateId", "name")
      .populate("createdBy", "name email role")
      .populate("team.marketer", "name email role")
      .populate("team.reviewer", "name email role")
      .populate("team.designer", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "My instances fetched successfully",
      data: instances,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch my instances",
      error: error.message,
    });
  }
};

module.exports = {
  createInstance,
  getAllInstances,
  getInstanceById,
  getUsersInstance,
};
