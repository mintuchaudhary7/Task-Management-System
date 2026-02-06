const Comment = require("../models/comment");
const Task = require("../models/Task");

/**
 * Add comment to a task
 * POST /api/comments/:taskId
 */
exports.addComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Anyone logged in can add comment
    const comment = await Comment.create({
      taskId,
      userId: req.user.id,
      message,
    });

    task.comments.push(comment._id);
    await task.save();

    const populatedComment = await Comment.findById(comment._id).populate(
      "userId",
      "name role email",
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: populatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Get all comments of a task
 * GET /api/comments/:taskId
 */
exports.getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate({
      path: "comments",
      populate: { path: "userId", select: "name role email" },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Anyone logged in can view comments
    return res.status(200).json({
      success: true,
      message: "Task comments fetched successfully",
      data: task.comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
