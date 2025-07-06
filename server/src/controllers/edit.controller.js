import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import User from "../models/user.model.js";

let edit = asyncHandler(async (req, res) => {
  let { username } = req.params;
  let { newUserName, newPassword, newEmail, newFullName } = req.body;

  let currentUser = req.user; //auth
  let user = await User.findById(currentUser._id);
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found", codes.notFound).res());
  }

  // Prevent editing someone else
  if (user.userName !== username) {
    return res
      .status(codes.forbidden)
      .json(
        new ApiErrorResponse(
          "Cannot edit other user's credentials",
          codes.forbidden
        ).res()
      );
  }

  // Check if no update fields provided
  if (!(newUserName || newPassword || newEmail || newFullName)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "No data provided for update",
          codes.badRequest
        ).res()
      );
  }

  // ===> DYNAMICALLY UPDATE FIELDS <===
  let updated = false;

  // Email
  if (newEmail && newEmail !== user.email) {
    let emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res
        .status(codes.conflict)
        .json(
          new ApiErrorResponse("Email already in use", codes.conflict).res()
        );
    }
    user.email = newEmail;
    updated = true;
  }

  // Username
  if (newUserName && newUserName !== user.userName) {
    let userExists = await User.findOne({ userName: newUserName });
    if (userExists) {
      return res
        .status(codes.conflict)
        .json(
          new ApiErrorResponse("Username already taken", codes.conflict).res()
        );
    }
    user.userName = newUserName;
    updated = true;
  }

  // Full Name
  if (newFullName && newFullName !== user.fullName) {
    user.fullName = newFullName;
    updated = true;
  }

  // Password
  if (newPassword) {
    let isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res
        .status(codes.conflict)
        .json(
          new ApiErrorResponse(
            "New password must be different",
            codes.conflict
          ).res()
        );
    }
    user.password = newPassword; // Will be hashed by pre-save hook
    updated = true;
  }

  if (!updated) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("No changes detected", codes.badRequest).res()
      );
  }

  // Invalidate tokens
  user.refreshToken = null;

  await user.save();

  return res
    .status(codes.accepted)
    .json(
      new ApiResponse(
        "Profile updated successfully. Please log in again.",
        codes.accepted
      ).res()
    );
});

export default edit;
