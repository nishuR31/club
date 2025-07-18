import mongoose from "mongoose";

export default async function mongoDB() {
  return await mongoose.connect(process.env.MONGO_URI);
}


//-------------------