// delete: profile/username/delete

import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import User from "../models/user.model.js";

const deletion = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { userName, email, _id } = req.user;

  // Check for missing fields
  if (isEmptyArr([userName, email, _id])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Required fields are missing",
          codes.badRequest
        ).res()
      );
  }

  // Check if provided user matches route param
  if (userName !== username) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Mismatched user deletion detected",
          codes.conflict
        ).res()
      );
  }

  // Attempt to delete user
  const client = await User.findOneAndDelete({ userName: username });

  if (!client) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "User not found, cannot delete.",
          codes.notFound
        ).res()
      );
  }

  for (let cookieName in req.cookies) {
    res.clearCookie(cookieName, {
      httpOnly: true,
      sameSite: "Lax", // or Lax/Strict
      secure: "None",
    });
  }

  //   res.clearCookie("userAccessToken", {
  //   httpOnly: true,
  //   sameSite: "Lax",
  //   secure: false, // match original; NOT "None" — it's a boolean
  // });

  // res.clearCookie("userRefreshToken", {
  //   httpOnly: true,
  //   sameSite: "Lax",
  //   secure: false,
  // });

  // Success response
  return res
    .status(codes.accepted)
    .json(new ApiResponse("User deletion completed", codes.accepted).res());
});

export default deletion;
