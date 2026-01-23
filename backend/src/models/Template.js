const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    tasks: [
      {
        name: { type: String, required: true },
        order: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
