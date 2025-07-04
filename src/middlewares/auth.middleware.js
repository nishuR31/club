import codes from "../contants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccess, verifyRefresh } from "../utils/tokenization.js";
import User from "../models/user.model.js";

const authMiddleware = (required = true) =>
  asyncHandler(async (req, res, next) => {
    let { userRole } = req.params;

    let accessToken = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.cookies.userAccessToken;

    let refreshToken = req.cookies.userRefreshToken;

    // Handle missing tokens
    if (!accessToken || !refreshToken) {
      if (required) {
        return res
          .status(codes.unauthorized)
          .json(
            new ApiErrorResponse("Missing tokens", codes.unauthorized).res()
          );
      } else {
        req.user = null;
        return next();
      }
    }

    let decodedAccess, decodedRefresh;

    // Verify tokens
    try {
      decodedAccess = verifyAccess(accessToken);
      decodedRefresh = verifyRefresh(refreshToken);
    } catch (err) {
      if (required) {
        return res
          .status(codes.internalServerError)
          .json(
            new ApiErrorResponse(
              "Token verification failed",
              codes.internalServerError
            ).res()
          );
      } else {
        req.user = null;
        return next();
      }
    }

    // Check token payloads match
    if (
      !decodedAccess ||
      !decodedRefresh ||
      decodedAccess._id !== decodedRefresh._id
    ) {
      return res
        .status(codes.badRequest)
        .json(new ApiErrorResponse("Tokens mismatch", codes.badRequest).res());
    }

    const { _id, email, userName, role } = decodedRefresh;

    // Check role match if required
    if (required && userRole && userRole !== role) {
      return res
        .status(codes.unauthorized)
        .json(new ApiErrorResponse("Roles mismatch", codes.unauthorized).res());
    }

    // Validate user
    const user = await User.findOne({
      $or: [{ email }, { userName }, { _id }],
    });

    if (!user || user.refreshToken !== refreshToken) {
      if (required) {
        return res
          .status(codes.conflict)
          .json(
            new ApiErrorResponse(
              "Invalid user or refresh token",
              codes.conflict
            ).res()
          );
      } else {
        req.user = null;
        return next();
      }
    }

    // ✅ All checks passed
    req.user = decodedRefresh;
    next();
  });

export default authMiddleware;
