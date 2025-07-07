import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


let dashboard = asyncHandler(async (req, res) => {
    let {user}=req.params;
  if (!req.user || !req.user.roles.includes(user)) {
    return res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Admin login required,access denied!").res());
  }

  return res.status(codes.found).json(new ApiResponse(`welcome ${req.user.userName}`).res() );
});

export default dashboard;
