// signup:auth/user/signup

import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import User from "../models/user.model.js";

let signup = asyncHandler(async (req, res) => {
  let body = req.body;
  let { user } = req.params;
  let { userName, email, roles, fullName, password } = body;
  if (!user.some(role => roles.includes(roles))) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Unauthorized accepted detected",
          codes.unauthorized
        ).res()
      );
  }
  if (isEmptyArr([userName, fullName, email, roles]) || !password) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Some fields are missing", codes.badRequest).res()
      );
  }
  let client = await User.findOne({ userName: userName, $or: [{ email }] });
  if (client) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Credentials found, please login",
          codes.conflict
        ).res()
      );
  }
  let newUser = await User.create(body);
  return res.status(codes.created).json(
    new ApiResponse("User successfully created", codes.created, {
      userName: newUser.userName,
    }).res()
  );
});

export default signup;
