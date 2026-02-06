const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },

    instanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instance",
      required: true,
    },

    assignedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "for-review",
        "changes-requested",
        "approved",
        "completed",
      ],
      default: "pending",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
