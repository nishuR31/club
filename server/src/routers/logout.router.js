// logoutRouter
// 

import express from "express";
import logout from "../controllers/logout.controller.js";
import auth from "../middlewares/auth.middleware.js";
import roles from "../middlewares/roles.middleware.js";

let logoutRouter = express.Router();
logoutRouter.get(`/logout`,auth,roles("admin","client","creator"), logout);

export default logoutRouter;
