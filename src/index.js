import dotenv from "dotenv";

import app from "./config/app.js";
import connectDB from "./config/connnect.js";

dotenv.config({ path: "./.env" });

let uri = process.env.MONGO_URI;
let port = process.env.PORT || 3001;

async function start() {
  await connectDB(uri);
  app.listen(port, () => {
    console.log("server chal raha");
  });
}

start();
