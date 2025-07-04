import express from "express";

import signinRouter from "../routers/signin.router.js";
let signinRoute = express.Router();
signinRoute.use("/auth", signinRouter);

export default signinRoute;
