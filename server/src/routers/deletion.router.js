import express from "express";
import deletion from "../controllers/delete.controller.js";
import auth from "../middlewares/auth.middleware.js"
let deletionRouter=express.Router();
deletionRouter.get("/profile/:username/delete",auth,deletion);
export default deletionRouter;