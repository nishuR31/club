import express from "express";
import cookie from "cookie-parser";
import morgon from "morgan";
import cors from "cors";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgon("dev"));

app.get("/", (req, res) => {
  res.send("client");
});

app.get("/sagar", (req, res) => {
  res.json({ message: "Sagar" });
});
app.listen(3000, () => {
  console.log("server chal raha");
});
