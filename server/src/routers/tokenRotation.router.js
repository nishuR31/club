
// tokenRotationRouter

import express from "express";
import tokenRotation from "../controllers/tokenRotation.controller.js";
import auth from "../middlewares/auth.middleware.js";
import roles from "../middlewares/roles.middleware.js";

let tokenRotationRouter = express.Router();
tokenRotationRouter.get("/:user/token-rotation/",auth,roles(), tokenRotation);


export default tokenRotationRouter;
