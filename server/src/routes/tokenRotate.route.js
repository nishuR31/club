
// tokenRotationRoute

import express from "express";
import tokenRotationRouter from "../routers/tokenRotation.router.js";
let tokenRotationRoute = express.Router();
tokenRotationRoute.use("/auth", tokenRotationRouter);
export default tokenRotationRoute;
