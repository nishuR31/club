import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

  

const role = (need=true,roles=[]) => asyncHandler(async (req, res, next) => {
    if (!req.user || !roles.some((role) => req.user.role.includes(role))) {
    return need ? res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Unauthorized, access denied.",codes.unauthorized).res()
    ):
  next();}
});

export default role;
