const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //TODO:
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
      rquired: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    activationToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true, autoCreate: true, autoIndex: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
