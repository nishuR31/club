
// forgotRoute
import express from "express";
import forgotRouter from "../routers/forgot.router.js";
let forgotRoute = express.Router();
forgotRoute.use("/auth", forgotRouter);
export default forgotRoute;
