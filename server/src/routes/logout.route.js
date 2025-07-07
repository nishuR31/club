import express from "express";

import logout from "../controllers/logout.controller.js";
let logoutRoute = express.Router();
logoutRoute.use("/auth", logout);

export default logoutRoute;
