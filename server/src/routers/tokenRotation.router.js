
// tokenRotationRouter

import express from "express";
import tokenRotation from "../controllers/tokenRotation.controller.js";
import auth from "../middlewares/auth.middleware.js";

let tokenRotationRouter = express.Router();
tokenRotationRouter.get("/:user/token-rotation",auth, tokenRotation);

export default tokenRotationRouter;
