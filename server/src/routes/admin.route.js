import express from "express";
import dashboardData from "../controllers/dashboard.data.controller.js";
import signin from "../controllers/signin.controller.js";
import adminSignup from "../controllers/admin.signup.controller.js";
import completeSignup from "../controllers/complete.signup.controller.js";
import edit from "../controllers/edit.controller.js";
import deletion from "../controllers/deletion.controller.js";
import logout from "../controllers/logout.controller.js";
import tokenRotation from "../controllers/token.rotation.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const adminRouter = express.Router();


adminRouter.get("/admin/dashboard", auth(true),role(true,["admin"]), dashboardData);
adminRouter.patch("/admin/edit", auth(true),role(true,["admin"]), edit);
adminRouter.get("/admin/logout", auth(true),role(true,["admin"]), logout);
adminRouter.get("/admin/token-rotation", auth(true),role(true,["admin"]), tokenRotation); 
adminRouter.post("/admin/signin", auth(false), role(false,["admin"]),signin);
adminRouter.post("/admin/signup", adminSignup , completeSignup);
adminRouter.delete("/admin/delete", auth(true),role(true,["admin"]), deletion);

export default adminRouter;
// adminRouter

////-------------------------