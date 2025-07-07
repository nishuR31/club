import express from "express";

import homeFill from "../controllers/homeFill.controller.js";
import homePage from "../controllers/homePage.controller.js";
let homeRouter = express.Router();
homeRouter.get("/common/help", homePage);
homeRouter.post("/common/help", homeFill);

export default homeRouter;
