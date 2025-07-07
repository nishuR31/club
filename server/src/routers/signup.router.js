// signupRouter

import express from "express";
import signup from "../controllers/signup.controller.js";
import roles from "../middlewares/roles.middleware.js";


let signupRouter = express.Router();
signupRouter.post("/signup/:user",roles("admin","client","creator"), signup);


export default signupRouter;
