import mongoose from "mongoose";

export default async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.log(`mongodb succesfully connected : ${err}`);
  }
}
