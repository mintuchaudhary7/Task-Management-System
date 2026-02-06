const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // role: {
    //   type: String,
    //   enum: ["ADMIN", "DOER"],
    //   default: "DOER",
    // },
    role: {
      type: String,
      enum: ["ADMIN", "MARKETER", "REVIEWER", "DESIGNER"],
      default: "MARKETER",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
