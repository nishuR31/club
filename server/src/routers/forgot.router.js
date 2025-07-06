
// forgotrouter

import express from "express";
import forgotPassword from "../controllers/forgotPassword.controller.js";
import verifyForgotToken from "../controllers/verifyForgotToken.controller.js";
import changePassword from "../controllers/changePassword.controller.js";
import auth from "../middlewares/auth.middleware.js";

let forgotRouter = express.Router();

forgotRouter
  .post(`/forgot-password`,auth, forgotPassword)
  .post(`/verify-token`, auth,verifyForgotToken)
  .post(`/change-password`,auth, changePassword);

export default forgotRouter;
