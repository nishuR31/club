import mongoose from "mongoose";
import User from "./user.model.js";

const clientSchema = new mongoose.Schema({
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
  paid: { type: Boolean },

  profileCompleted: {
    type: Boolean,
    default: false,
  },
  avatar: { type: String, default: "../../../client/public/profile.jpg" },
  coverImg: { type: String },
});

let Client = mongoose.model("Client", clientSchema);
export default Client;
