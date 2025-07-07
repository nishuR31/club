// helpRouter


import express from "express";
import help from "../controllers/help.controller.js";
// import rolesOptional from "../middlewares/rolesOptional.middlewares.js";

let helpRouter = express.Router();

helpRouter.get("/common/help", help);
// helpRouter.get("/help", (req,res)=>{res.status(200).json({mess:"hello"})});

export default helpRouter;
