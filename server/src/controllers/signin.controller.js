// signin:auth/user/signup

import codes from "../constants/codes.js";
import cookieOptions from "../constants/cookieOptions.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import { tokenGeneration } from "../utils/tokenization.js";
import User from "../models/user.model.js";

let signin = asyncHandler(async (req, res) => {
  let { user } = req.params;
  let body = req.body;
  let { userName, email, password, roles } = body;
  if (isEmptyArr([user, roles, password]) || !(email || userName)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Some fields are missing", codes.badRequest).res()
      );
  }

  if (!user.some(role => roles.includes(role))) {
    return res.status(codes.unauthorized).json(
      new ApiErrorResponse(
        "Unauthorized access detected",
        codes.unauthorized,
        {
          roles: roles,
          tryingFor: user,
        }
      ).res()
    );
  }

  let client = await User.findOne({ $or: [{ email }, { userName }] });
  if (!client) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "Client not found, please register",
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
          "Credentials are invalid, please try again",
          codes.conflict
        ).res()
      );
  }
  let payload = {
    _id: client._id,
    userName: client.userName,
    email: client.email,
    roles: client.roles,
  };
  let { refreshToken, accessToken } = tokenGeneration(payload);
  client.refreshToken = refreshToken;
  await client.save();
  res.cookie(`${user}AccessToken`, accessToken, cookieOptions("access"));
  res.cookie(`${user}RefreshToken`, refreshToken, cookieOptions("refresh"));
  // res.cookie(`nishan`, "nishan", cookieOptions("refresh"));

  return res.status(codes.found).json(
    new ApiResponse(`hello ${client.userName} , logging you in`, codes.found, {
      userName: client.userName,
      fullName: client.fullName,
      role: client.role,
      accessToken: accessToken,
    }).res()
  );
});

export default signin;
