import mongoose from "mongoose";

export default async function mongoDB(uri) {
  return await mongoose.connect(uri);
}
