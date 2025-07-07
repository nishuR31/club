import mongoose from "mongoose";
import User from "./user.model.js";

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // model name as string, not the import
    required: true,
  },
  badges: {
    type: String,
  },
  //   plan: {
  //     type: String,
  //     enum: ["free", "pro", "enterprise"],
  //     default: "free",
  //   },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
  },

  profileCompleted: {
    type: Boolean,
    default: false,
  },
  avatar: { type: String, default: "../../../client/public/profile.jpg" },
  coverImg: { type: String },
});

let Admin = mongoose.model("Admin", adminSchema);
export default Admin;
