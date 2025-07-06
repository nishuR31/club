// editrouter
import express from "express";
import edit from "../controllers/edit.controller.js";
import auth from "../middlewares/auth.middleware.js";

let editRouter = express.Router();
editRouter.post(`/profile/:username/edit`, auth, edit);

export default editRouter;
