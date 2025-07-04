import express from "express";
import forgotPassword from "../controllers/forgotPassword.controller.js";
import sendVerification from "../controllers/sendVerification.controller.js";
import verifyToken from "../controllers/verifyToken.controller.js";
import passwordChange from "../controllers/passwordChange.controller.js";
let forgotPasswordRouter = express.Router();
forgotPasswordRouter.post("/forgot-password", forgotPassword); //check email and verify email existance and check
forgotPasswordRouter.post("/send-verification", sendVerification); //send otp ya token using email ,client wapis bhejega 
forgotPasswordRouter.post("/verify-token", verifyToken); // checking otp /token with db
forgotPasswordRouter.post("/password-change", passwordChange); // checking otp /token with db

export default forgotPasswordRouter;
