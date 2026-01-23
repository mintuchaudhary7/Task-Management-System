const Template = require("../models/Template");

/* ================= CREATE TEMPLATE ================= */
const createTemplate = async (req, res) => {
  try {
    const { name, description, tasks } = req.body;

    if (!name || !tasks || tasks.length === 0) {
      return res.status(400).json({
        message: "Template name and at least one task are required",
      });
    }

    // optional: ensure tasks have order
    const formattedTasks = tasks.map((task, index) => ({
      name: task.name,
      order: task.order ?? index + 1,
    }));

    const template = await Template.create({
      name,
      description,
      tasks: formattedTasks,
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL TEMPLATES ================= */
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET TEMPLATE BY ID ================= */
const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTemplate,
  getTemplates,
  getTemplateById,
};
