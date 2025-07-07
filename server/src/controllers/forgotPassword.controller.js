// forgot: auth/forgot-password

import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import OTPGen from "../utils/OTPGen.js";
import sendMail from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // ❗ You forgot to import bcrypt
import User from "../models/user.model.js";

let forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (isEmptyArr([email])) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Email is empty", codes.badRequest).res());
  }

  const client = await User.findOne({email: email });

  if (!client) {
    return res
      .status(codes.notFound)
      .json( 
        new ApiErrorResponse("User with this email not found", codes.notFound, {
          email,
        }).res()
      );
  }

  const otp = OTPGen();
  const hashOTP = await bcrypt.hash(otp.toString(), 10);

  client.otp = hashOTP;
  client.otpExp = Date.now() + 15 * 60 * 1000; // ✅ 15 minutes in the future

  await client.save();

  await sendMail(email,client.userName, otp); // Send plain OTP or styled HTML  
  // to,username,otp

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(
        "OTP sent to email, redirect to verification step",
        codes.ok,{"Email sent to":email}
      ).res()
    );
});

export default forgotPassword;
