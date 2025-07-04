import express from "express";

import signupRouter from "../routers/signup.router.js";
let signupRoute = express.Router();
signupRoute.use("/auth", signupRouter);

export default signupRoute;
