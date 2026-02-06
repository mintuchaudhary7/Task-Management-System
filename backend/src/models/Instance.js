const mongoose = require("mongoose");

const instanceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },

    team: {
      marketer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      designer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Instance", instanceSchema);



// const instanceSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     templateId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Template",
//       required: true
//     },
//     assignedUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Instance", instanceSchema);

