// tokenRotation: auth/user/token-rotation

import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import { tokenGeneration,verifyRefresh,accessToken } from "../utils/tokenization.js";
import cookieOptions from "../utils/cookieOptions.js";
let tokenRotation = asyncHandler(async (req, res) => {
  let { _id, userName, email,role } = req.user;

  if (!req.user) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Unauthorized: login is required",
          codes.badRequest).res()
      );
  }
  let client = await User.findOne({ $or: [{ userName }, { email }, { _id }] });
  if (!client) {
    return res
      .status(codes.notFound)
      .json("User is not found or don't exists.", codes.notFound)
      .res();
  }
  let payload = {
    _id: client._id,
    userName: client.userName,
    email: client.email,
    role: client.role,
  };
  let decodedRefresh=verifyRefresh(client.token.refreshToken);
  if(!decodedRefresh){return res.status(codes.unauthorized).json(new ApiErrorResponse("Token verification failed.",code.unauthorized).res())}
  let accessToken  = accessToken(payload);

    res.cookie(`userAccessToken`, accessToken, cookieOptions("access"));
  return res.status(codes.ok).json(
    new ApiResponse("Token rotation successfull.", codes.ok, {
      accessToken: accessToken,
    }).res()
  );
});

export default tokenRotation;


//----------------------