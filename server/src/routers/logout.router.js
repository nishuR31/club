// logoutRouter
// 

import express from "express";
import logout from "../controllers/logout.controller.js";
import auth from "../middlewares/auth.middleware.js";

let logoutRouter = express.Router();
logoutRouter.get(`/profile/:username/logout`,auth, logout);

export default logoutRouter;
