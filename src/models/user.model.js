import mongoose from "mongoose";
import bcrypt from "bcrypt";
import required from "../utils/required.js";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, required("username")],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, required("email")],
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
      index: true,
      default: "",
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    password: {
      type: String,
      required: [true, required("password")],
    },
    refreshToken: {
      type: String,
      default: null,
    },

    otp: {
      type: String,
      default: null,
    },

    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("findByIdAndUpdate", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.passwordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
