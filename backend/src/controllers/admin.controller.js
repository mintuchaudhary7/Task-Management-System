const User = require("../models/User");
const Template = require("../models/Template");
const Instance = require("../models/Instance");
const Task = require("../models/Task");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalAdmins = await User.countDocuments({ role: "ADMIN" });
    const totalMarketers = await User.countDocuments({ role: "MARKETER" });
    const totalReviewers = await User.countDocuments({ role: "REVIEWER" });
    const totalDesigners = await User.countDocuments({ role: "DESIGNER" });

    const totalMembers = totalMarketers + totalReviewers + totalDesigners;

    const totalTemplates = await Template.countDocuments();
    const totalInstances = await Instance.countDocuments();
    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        totalMembers,
        totalMarketers,
        totalReviewers,
        totalDesigners,
        totalTemplates,
        totalInstances,
        totalTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAdminStats };
