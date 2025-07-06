import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { verifyAccess, verifyRefresh } from "../utils/tokenization.js"; // use correct methods
import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";

const auth = asyncHandler(async (req, res, next) => {
  let accessToken =
    req.headers?.authorization?.split(" ")[1] || req.cookies?.userAccessToken;
  let refreshToken = req.cookies?.userRefreshToken;

  if (!accessToken || !refreshToken) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Missing authentication tokens",
          codes.unauthorized
        ).res()
      );
  }

  let decodedAccess, decodedRefresh;

  try {
    decodedAccess = verifyAccess(accessToken);
  } catch (err) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Access token invalid or expired",
          codes.unauthorized,
          {},
          err
        ).res()
      );
  }

  try {
    decodedRefresh = verifyRefresh(refreshToken);
  } catch (err) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Refresh token invalid",
          codes.unauthorized,
          {},
          err
        ).res()
      );
  }

  if (decodedAccess._id !== decodedRefresh._id) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Token identity mismatch",
          codes.unauthorized
        ).res()
      );
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
