import express from "express";
import dashboard from "../controllers/dashboard.controller.js";
import dashboardData from "../controllers/dashboard.data.controller.js";
import auth from "../middlewares/auth.middleware.js"
import roles from "../middlewares/roles.middleware.js"


let dashboardRouter=express.Router();
dashboardRouter.get("/:user/dashboard",auth,roles("admin"),dashboard);
dashboardRouter.get("/:user/dashboard/data",auth,roles("admin"),dashboardData);
export default dashboardRouter;