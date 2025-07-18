import express from "express";

import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import homePage from "../controllers/homePage.controller.js"
import homeFill from "../controllers/homeFill.controller.js"

let homeRouter=express.Router();
homeRouter.get("/home ",homePage);
homeRouter.post("/home ",auth(true),role(true,["admin"]),homeFill);
export default homeRouter;




////==========================