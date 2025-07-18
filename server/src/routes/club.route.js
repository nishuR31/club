import express from "express";

import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import createClub from "../controllers/createClub.controller.js"
import deletionClub from "../controllers/deletionClub.controller.js"
import editClub from "../controllers/createClub.controller.js"

let clubRouter=express.Router();
clubRouter.post("/club/create ",auth(true),role(true,["creator"]),createClub);
clubRouter.delete("/club/deletion ",auth(true),role(true,["creator"]),deletionClub);
clubRouter.patch("/club/edit ",auth(true),role(true,["creator"]),editClub);
export default clubRouter;




////==========================