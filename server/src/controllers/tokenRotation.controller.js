// tokenRotation: auth/user/token-rotation

import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import { tokenGeneration } from "../utils/tokenization.js";
import cookieOptions from "../constants/cookieOptions.js";
let tokenRotation = asyncHandler(async (req, res) => {
  let { user } = req.params;
  let { _id, userName, email } = req.user;

  if (isEmptyArr([_id, userName, email])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Some fields are empty", codes.badRequest).res()
      );
  }
  let client = await User.findOne({ $or: [{ userName }, { email }, { _id }] });
  if (!client) {
    return res
      .status(codes.notFound)
      .json("User not found", codes.notFound)
      .res();
  }
  let payload = {
    _id: client._id,
    userName: client.userName,
    email: client.email,
    role: client.role,
  };
  let { refreshToken, accessToken } = tokenGeneration(payload);

  client.refreshToken = refreshToken;
  await client.save();
  res.cookie(`userAccessToken`, accessToken, cookieOptions("access"));
  res.cookie(`userRefreshToken`, refreshToken, cookieOptions("refresh"));
  return res.status(codes.ok).json(
    new ApiResponse("Token rotation successfull", codes.ok, {
      accessToken: accessToken,
    }).res()
  );
});

export default tokenRotation;
