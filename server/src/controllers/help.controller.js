// help: /help

import codes from "../contants/codes.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

let help = asyncHandler(async (req, res) => {
  return res.status(codes.ok).json(
    new ApiResponse("Help guide", codes.ok, {
      edit: "POST /profile/:username/edit",
      deletion: "GET /profile/:username/delete",
      forgotPassword: "POST /auth/forgot-password",
      verifyForgotToken: "POST /auth/verify-token",
      changePassword: "POST /auth/change-password",
      home: "GET /home",
      logout: "GET /profile/:username/logout",
      profile: "GET /profile/:username",
      signin: "POST /auth/:user/signin",
      signup: "POST /auth/:user/signup",
      tokenRotation: "GET /auth/:user/token-rotation",
      help: "GET /help",
    }).res()
  );
  2;
});

export default help;
