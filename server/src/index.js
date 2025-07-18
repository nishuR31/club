import app from "./config/app.js";
import mongoDB from "./config/connectDB.js";
// import dotenv from "dotenv";
// // dotenv.config({ path: "./.env" });
// dotenv.config();
import "./utils/config.env.js";

let port = process.env.PORT || 4000;

(async function server() {
  try {
    await mongoDB();
    console.log(`Mongo Fired up`);

    app.listen(port, () => {
      console.log(`Server Fired up on port : ${port}`);
    });
  } catch (err) {
    console.log(`Error occured : ${err}`);
  }
})();
