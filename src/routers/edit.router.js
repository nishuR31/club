import express from "express";

import edit from "../controllers/edit.controller.js";
let editRouter = express.Router();
editRouter.use("/profile/:user/edit", edit);

export default editRouter;
