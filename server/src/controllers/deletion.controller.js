// delete: profile/username/delete

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import User from "../models/user.model.js";

const deletion = asyncHandler(async (req, res) => {
  const { userName, email, _id, role } = req.user;

  // Check for missing fields
  if (!req.user) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "User not logged in, so can't delete",
          codes.badRequest
        ).res()
      );
  }

  // Attempt to delete user
  const client = await User.findByIdAndDelete( _id );

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


//-----------------------