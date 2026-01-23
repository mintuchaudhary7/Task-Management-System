const mongoose = require("mongoose");

const instanceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true
    },
    assignedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instance", instanceSchema);
