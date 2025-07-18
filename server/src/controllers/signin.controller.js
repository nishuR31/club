// signin:auth/user/signup

import codes from "../utils/codes.js";
import cookieOptions from "../utils/cookieOptions.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import { tokenGeneration } from "../utils/tokenization.js";
import User from "../models/user.model.js";

let signin = asyncHandler(async (req, res) => {
  let { userName, email, password, role } = req.body;
  if (isEmptyArr([role, password]) || !(email || userName)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Mandatory credentials are missing.", codes.badRequest).res()
      );
  }

  let client = await User.findOne({ $or: [{ email }, { userName }] });
  if (!client) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "Client not found, please register or try again.",
          codes.notFound
        ).res()
      );
  }
  if (!(await client.comparePassword(password))) {
    //add method using bcrypt
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Password seems wrong, please try again",
          codes.conflict
        ).res()
      );
  }
  let payload = {
    _id: client._id,
    userName: client.userName,
    email: client.email,
    roles: client.role,
  };
  let { refreshToken, accessToken } = tokenGeneration(payload);
  client.token.refreshToken = refreshToken;
  await client.save();
  res.cookie(`userAccessToken`, accessToken, cookieOptions("access"));
  res.cookie(`useRefreshToken`, refreshToken, cookieOptions("refresh"));
  // res.cookie(`nishan`, "nishan", cookieOptions("refresh"));

  return res.status(codes.found).json(
    new ApiResponse(`hello ${client.userName} , logging you in`, codes.found, {
      userName: client.userName,
      fullName: client.fullName,
      role: client.role,
      email:hideEmail(client.email),
      accessToken: accessToken,
    }).res()
  );
});

export default signin;


//---------------------