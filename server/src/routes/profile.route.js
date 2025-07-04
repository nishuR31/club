import express from "express";

import profile from "../controllers/profile.controller.js";
let profileRoute = express.Router();
profileRoute.use("/profile/:user", profile);

export default profileRoute;
