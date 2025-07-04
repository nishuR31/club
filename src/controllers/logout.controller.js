import codes from "../contants/codes.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const logout = asyncHandler(async (req, res) => {
  //auth/username/logout
  const { userRole } = req.params;
  const { email, _id, userName, role } = req.user;

  // Role mismatch check
  if (userRole !== role) {
    return res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Role mismatch", codes.unauthorized).res());
  }

  // Clear cookies safely
  if (req.cookies) {
    Object.keys(req.cookies).forEach((cookieName) => {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
    });
  }

  // Nullify refreshToken in DB (if used)
  const user = await User.findOne({ $or: [{ userName }, { email }, { _id }] });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  // Optional: You can also remove session/token from Redis or memory store if used

  return res
    .status(codes.accepted)
    .json(new ApiResponse("Successfully logged out", codes.accepted).res());
});

export default logout;
