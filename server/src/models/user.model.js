// usermodel

import mongoose from "mongoose";
import required from "../utils/required.js";
import validator from "validator";
import bcrypt from "bcrypt";

const roles = ["admin", "client"];

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, required("username")],
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true, // ensures all stored usernames are lowercase
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, required("email")],
      role: {
        type: String,
        enum: {
          values: roles,
          message: "Invalid role",
        },
        default: null,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, required("password")],
    },
    otp: {
      type: String,
    },
    otpExp: { type: Date },
    otpValid: { type: Boolean },
    refreshToken: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("findByIdAndUpdate", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 10);
    this.setUpdate({ ...update, password: hashed });
  }
  next();
});

let User = mongoose.model("User", userSchema);
export default User;
