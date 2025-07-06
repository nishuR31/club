
// profileRouter

import express from "express";
import profile from "../controllers/profile.controller.js";
import optional from "../middlewares/optional.middleware.js";
let profileRouter = express.Router();
profileRouter.get(`/profile/:username`,optional, profile);

export default profileRouter;
