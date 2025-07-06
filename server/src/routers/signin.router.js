// signinRouter

import express from "express";
import signin from "../controllers/signin.controller.js";
import optional from "../middlewares/optional.middleware.js";

let signinRouter = express.Router();
signinRouter.post(`/:user/signin`, optional, signin);

export default signinRouter;
