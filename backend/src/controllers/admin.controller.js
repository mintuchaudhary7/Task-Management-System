const User = require("../models/User");
const Template = require("../models/Template");
const Instance = require("../models/Instance");
const Task = require("../models/Task");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoers = await User.countDocuments({ role: "DOER" });
    const totalTemplates = await Template.countDocuments();
    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalDoers,
        totalTemplates,
        totalTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats };
