// middlewares/authOptional.middleware.js
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccess, verifyRefresh } from "../utils/tokenization.js";
import User from "../models/user.model.js";

const authOptional = asyncHandler(async (req, res, next) => {
  let { user } = req.params;
  const accessToken =
    req.headers?.authorization?.split(" ")[1] ||
    req.cookies?.[`${user}AccessToken`];
  const refreshToken = req.cookies?.[`${user}RefreshToken`];

  // If no tokens, move on as guest
  if (!accessToken || !refreshToken) {
    req.user = null;
    return next();
  }

  const decodedAccess = verifyAccess(accessToken);
  const decodedRefresh = verifyRefresh(refreshToken);

  if (decodedAccess._id !== decodedRefresh._id) {
    req.user = null;
    return next(); // token mismatch, treat as guest
  }

  const client = await User.findById(decodedRefresh._id);
  if (!client) {
    req.user = null;
    return next(); // user not found, treat as guest
  }

  req.user = {
    _id: client._id,
    userName: client.userName,
    email: client.email,
    role: client.role,
  };
  return next(); // valid token, assign user
});

export default authOptional;
