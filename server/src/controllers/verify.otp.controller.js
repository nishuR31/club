// verifyForgotToken:auth/verify-token

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"; // ✅ Required to compare OTP
import User from "../models/user.model.js";

const verifyOtp= asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Email or OTP is missing", codes.badRequest).res()
      );
  }

  const client = await User.findOne({ email });
  if (!client) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Account with email not found", codes.notFound).res());
  }

  // Check if OTP expired
  if (!client.otp.code || client.otp.expiry < Date.now()) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "OTP expired. Please request a new one.",
          codes.unauthorized
        ).res()
      );
  }

  // Compare hashed OTP
  const isMatch = await bcrypt.compare(otp, client.otp.code);
  if (!isMatch) {
    return res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Incorrect OTP", codes.unauthorized).res());
  }

  // Clear OTP after success
  client.otp.code = "";
  client.otp.valid = true;
  await client.save();

  return res
    .status(codes.ok)
    .json(
      new ApiResponse("OTP verified, proceed to reset password", codes.ok).res()
    );
});

export default verifyOtp;


//---------------------------