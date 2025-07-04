import express from "express";

import signin from "../controllers/signin.controller.js";
let signinRouter = express.Router();
signinRouter.use("/:userRole/signin", signin);

export default signinRouter;
