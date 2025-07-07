
// forgotrouter

import express from "express";
import forgotPassword from "../controllers/forgotPassword.controller.js";
import verifyForgotToken from "../controllers/verifyForgotToken.controller.js";
import changePassword from "../controllers/changePassword.controller.js";
import auth from "../middlewares/auth.middleware.js";
import roles from "../middlewares/roles.middleware.js"
let forgotRouter = express.Router();

forgotRouter
  .post(`/forgot-password`,auth,roles(), forgotPassword)
  .post(`/verify`, auth,roles(),verifyForgotToken)
  .post(`/reset-password`,auth,roles(), changePassword);

export default forgotRouter;
