import mongoose from "mongoose";

let category = [
  "technical",
  "cultural",
  "sports",
  "social",
  "electrical",
  "Art",
  "programming",
];
const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: category,
      default: ["other"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // could be an admin or client who created it
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    logo: {
      type: String, // URL or file path
    },
    banner: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    socialLinks: {
      website: String,
      instagram: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);
export default Club;
