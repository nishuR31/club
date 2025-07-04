import express from "express";

import signup from "../controllers/signup.controller.js";
let signupRouter = express.Router();
signupRouter.use("/:userRole/signup", signup);

export default signupRouter;
