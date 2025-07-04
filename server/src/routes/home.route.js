import express from "express";

import homeFill from "../controllers/homeFill.controller.js";
import homePage from "../controllers/homePage.controller.js";
let homeRoute = express.Router();
homeRoute.get("/home", homePage);
homeRoute.post("/home", homeFill);

export default homeRoute;
