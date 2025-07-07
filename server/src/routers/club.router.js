import express from "express";
import club from "../controllers/createClub.controller.js";
import auth from "../middlewares/auth.middleware.js"
import roles from "../middlewares/roles.middleware.js"


let clubRouter=express.Router();
clubRouter.get("/:user/create ",auth,roles("creator"),club);
export default clubRouter;