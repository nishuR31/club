// signupRouter

import express from "express";
import signup from "../controllers/signup.controller.js";

let signupRouter = express.Router();
signupRouter.post("/:user/signup", signup);

export default signupRouter;
