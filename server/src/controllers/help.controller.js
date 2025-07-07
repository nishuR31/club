// help: /help

import codes from "../constants/codes.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

let help = asyncHandler(async (req, res) => {
  return res.status(codes.ok).json(
    new ApiResponse("Help guide", codes.ok, {
      "create club": "POST /api/v1/auth/:user/create || Auth + Role", //
      "forgot Password": "POST	/api/v1/auth/forgot-password || Public", //
      "verify ": "POST	/api/v1/auth/verify || Public", //
      "change password": "POST	/api/v1/auth/reset-password || Public", //
      deletion: "GET /api/v1/:user/profile/delete ||  Auth + Role", //
      edit: "PUT  /api/v1/:user/profile/edit || Auth + Role", //
      home: "GET /api/v1/common/home || Public", //
      logout: "GET  /api/v1/auth/logout/ || Authenticated", //
      profile: "GET /api/v1/:user/profile/:username || Auth + Role", //
      signup: "POST /api/v1/auth/signup/:user || Public", //
      signin: "POST /api/v1/auth/signin/:user || Public", //
      dashboard: "GET /api/v1/:user/dashboard || Auth + Role",
      "dashboard users": "GET /api/v1/:user/dashboard/users || Auth + Role",
      tokenRotation: "GET /auth/:user/token-rotation ||  Auth + Role", //
      help: "GET  /api/v1/common/help || Public", //
      ping: "GET  /api/v1/common/ping || Public",
    }).res()
  );
  2;
});

export default help;
