import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { verifyAccess, verifyRefresh } from "../utils/tokenization.js"; // use correct methods
import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";

const auth = (need=true)=>asyncHandler(async (req, res, next) => {
  req.user=null;
  let accessToken =
    req.headers?.authorization?.split(" ")[1] || req.cookies?.userAccessToken;
  let refreshToken = req.cookies?.userRefreshToken;

  if (!accessToken || !refreshToken) {
    return need ?  res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Missing authentication tokens",
          codes.unauthorized
        ).res()
      ): next();
  }

  let decodedAccess, decodedRefresh;

  if(accessToken){try {
    decodedAccess = verifyAccess(accessToken);
  } catch (err) {
    return need ? res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Access token invalid or expired",
          codes.unauthorized,
          {},
          err
        ).res()
      ):next()
  }}

  if(refreshToken){try {
    decodedRefresh = verifyRefresh(refreshToken);
  } catch (err) {
    return need ? res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Refresh token invalid or expired",
          codes.unauthorized,
          {},
          err
        ).res()
      ):next()
  }}

  if (decodedAccess._id !== decodedRefresh._id) {
    return need ? res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Token identity mismatch",
          codes.unauthorized
        ).res()
      ):next();
  }

  const client = await User.findById(decodedRefresh._id);
  if (!client) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found", codes.notFound).res());
  }

  req.user = decodedRefresh;
  return next();
});

export default auth;
