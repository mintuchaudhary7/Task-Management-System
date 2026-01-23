const Instance = require("../models/Instance");
const Template = require("../models/Template");
const Task = require("../models/Task");

/* ================= CREATE INSTANCE + AUTO TASKS ================= */
const createInstance = async (req, res) => {
  try {
    const { name, templateId, assignedUserId } = req.body;

    if (!name || !templateId || !assignedUserId) {
      return res.status(400).json({
        message: "Instance name, templateId and assignedUserId are required",
      });
    }

    // 1️⃣ fetch template
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // 2️⃣ create instance
    const instance = await Instance.create({
      name,
      templateId,
      assignedUserId,
    });

    // 3️⃣ auto-generate tasks
    const tasksToCreate = template.tasks.map((task) => ({
      name: task.name,
      order: task.order,
      instanceId: instance._id,
      assignedUserId,
    }));

    await Task.insertMany(tasksToCreate);

    res.status(201).json({
      success: true,
      message: "Instance created and tasks assigned successfully",
      instance,
      tasksCreated: tasksToCreate.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL INSTANCES ================= */
const getAllInstances = async (req, res) => {
  try {
    const instances = await Instance.find()
      .populate("templateId", "name")
      .populate("assignedUserId", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: instances.length,
      data: instances,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET INSTANCE BY ID ================= */
const getInstanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const instance = await Instance.findById(id)
      .populate("templateId", "name description")
      .populate("assignedUserId", "name email role");

    if (!instance) {
      return res.status(404).json({
        success: false,
        message: "Instance not found",
      });
    }

    // fetch tasks of this instance
    const tasks = await Task.find({ instanceId: id }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      instance: instance,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createInstance,
  getAllInstances,
  getInstanceById
};
