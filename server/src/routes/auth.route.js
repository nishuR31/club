import express from "express";

import forgotPassword from "../controllers/forgot.password.controller.js";
import verifyOtp from "../controllers/verify.otp.controller.js";
import changePassword from "../controllers/change.password.controller.js";
import tokenRotation from "../controllers/token.rotation.controller.js";
// import issue from "../controllers/issue.controller.js";
import help from "../controllers/help.controller.js";
import ping from "../controllers/ping.controller.js";
import auth from "../middlewares/auth.middleware.js";

const authRouter = express.Router();
//["user", "admin"]

authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOtp);
authRouter.patch("/change-password", changePassword);
// authRouter.post("/issue", issue);
authRouter.get("/help", help);
authRouter.get("/ping", ping);
authRouter.get("/issue", auth(true) ,issue);
// authRouter
export default authRouter;

//-----------------------