// editrouter
import express from "express";
import edit from "../controllers/edit.controller.js";
import auth from "../middlewares/auth.middleware.js";
import roles from "../middlewares/roles.middleware.js";
let editRouter = express.Router();
editRouter.post(`/:user/profile/edit`, auth, roles(),edit);

export default editRouter;
