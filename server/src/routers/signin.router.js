// signinRouter

import express from "express";
import signin from "../controllers/signin.controller.js";
import rolesOptional from "../middlewares/rolesOptional.middleware.js";
import authOptional from "../middlewares/authOptional.middleware.js";

let signinRouter = express.Router();
signinRouter.post(`/signin/:user`, authOptional,rolesOptional(), signin);


export default signinRouter;
