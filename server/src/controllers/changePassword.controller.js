// changePassword:auth/change-password

import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import bcrypt from "bcrypt"; // Required to hash password
import User from "../models/user.model.js";

let changePassword = asyncHandler(async (req, res) => {
  let newData = {
    userName: req.body.userName ?? null,
    email: req.body.email ?? null,
    password: req.body.password ?? null,
  };
  let { userName, password, email } = newData;

  if (isEmptyArr([password]) || !(email || userName)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Missing credentials", codes.badRequest).res()
      );
  }

  let client = await User.findOne({ $or: [{ userName }, { email }] });
  if (!client) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found", codes.notFound).res());
  }

  if (!client.otpValid) {
    {
      return res
        .status(codes.unauthorized)
        .json(
          new ApiErrorResponse("OTP is not verified", codes.unauthorized).res()
        );
    }
  }

  // Hash the new password
  const isSame = await bcrypt.compare(password, client.password);
  if (isSame) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "New password must be different",
          codes.conflict
        ).res()
      );
  }

  client.password = password;
  client.refreshToken = null;
  client.otpCheck = false;

  await client.save(); // Triggers schema validations (optional)

  return res
    .status(codes.ok)
    .json(new ApiResponse("User password updated", codes.ok).res());
});

export default changePassword;
