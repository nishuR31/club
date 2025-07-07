
// clubRoute
import express from "express";
import clubRouter from "../routers/club.router.js";
let clubRoute = express.Router();
clubRoute.use("/auth", clubRouter);
export default clubRoute;
