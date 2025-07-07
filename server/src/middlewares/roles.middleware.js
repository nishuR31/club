import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

  

const roles = (...roles) => asyncHandler(async (req, res, next) => {
    if (!req.user || !roles.some((role) => req.user.roles.includes(role))) {
    return res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Access denied",codes.unauthorized).res());
  }
  next();
});

export default roles;
