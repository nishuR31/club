import app from "./src/config/app.js";
import mongoDB from "./src/config/connectDB.js";
// import dotenv from "dotenv";
// // dotenv.config({ path: "./.env" });
// dotenv.config();
import "./src/utils/config.env.js";

let uri = process.env.MONGO_URI;
let port = process.env.PORT || 4000;

(async function server() {
  try {
    await mongoDB(uri);
    console.log(`Mongo Fired up`);

    app.listen(port, () => {
      console.log(`Server Fired up on port : ${port}`);
    });
  } catch (err) {
    console.log(`Error occured : ${err}`);
  }
})();
