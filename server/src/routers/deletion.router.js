import express from "express";
import deletion from "../controllers/deletion.controller.js";
import auth from "../middlewares/auth.middleware.js"
import roles from "../middlewares/roles.middleware.js"


let deletionRouter=express.Router();
deletionRouter.get("/:user/profile/delete",auth,roles(),deletion);
export default deletionRouter;