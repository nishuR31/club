import express from "express";
import ping from "../controllers/ping.controller.js";


let pingRouter=express.Router();
pingRouter.get("/common/ping",ping);
export default pingRouter;