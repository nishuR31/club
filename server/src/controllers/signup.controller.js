// signup:auth/user/signup

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import hideEmail from "../utils/hideEmail.js";
import User from "../models/user.model.js";

let signup = asyncHandler(async (req, res) => {
  let { userName, email, role, fullName, password } = req.body;

  if (isEmptyArr([userName, fullName, email, role, password]) ) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("mandatory fields are required.", codes.badRequest).res()
      );
  }
  let client = await User.findOne({$or: [{ email },{userName}] });
  if (client) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Account with Credentials already in user, please login or change credentials",
          codes.conflict
        ).res()
      );
  }
  let newUser = await User.create(req.body);
  return res.status(codes.created).json(
    new ApiResponse("User successfully created", codes.created, {
      userName: newUser.userName,
      email:hideEmail(newUser.email)
    }).res()
  );
});

export default signup;

//-----------------------------
