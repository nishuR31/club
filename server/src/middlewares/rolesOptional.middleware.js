import asyncHandler from "../utils/asyncHandler.js";

const rolesOptional = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user || !roles.some((role) => req.user.roles.includes(role))) {
      req.user = null;
      next();
    }
    next();
  });

export default rolesOptional;
