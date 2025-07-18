import express from "express";
import profile from "../controllers/profile.controller.js";
import signin from "../controllers/signin.controller.js";
import signup from "../controllers/signup.controller.js";
import edit from "../controllers/edit.controller.js";
import deletion from "../controllers/deletion.controller.js";
import logout from "../controllers/logout.controller.js";
import tokenRotation from "../controllers/token.rotation.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const userRouter = express.Router();


userRouter.get("/profile/:username", auth(true),role(true,["client"]), profile);
userRouter.post("/signin", auth(false), role(false,["client"]),signin);
userRouter.post("/signup", signup);
userRouter.patch("/edit", auth(true),role(true,["client"]), edit);
userRouter.delete("/delete", auth(true),role(true,["client"]), deletion);
userRouter.get("/logout", auth(true),role(true,["client"]), logout);
userRouter.get("/token-rotation", auth(true),role(true,["client"]), tokenRotation); 

export default userRouter;
// userRouter

////-------------------------