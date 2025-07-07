
// profileRouter

import express from "express";
import profile from "../controllers/profile.controller.js";
import authOptional from "../middlewares/authOptional.middleware.js";
import rolesOptional from "../middlewares/rolesOptional.middleware.js";


let profileRouter = express.Router();
profileRouter.get(`/:user/profile/:username`,authOptional,rolesOptional("admin","client","creator"), profile);

export default profileRouter;
