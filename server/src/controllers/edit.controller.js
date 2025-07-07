import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import User from "../models/user.model.js";

let edit = asyncHandler(async (req, res) => {
  let { user} = req.params;
  let { newUserName, newPassword, newEmail, newFullName } = req.body;

if(!req.user){return res.status(codes.notFound).json(new ApiErrorResponse("User is not logged in",codes.notFound).res())}

  let client = await User.findById(req.user._id);
  if (!client) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found", codes.notFound).res());
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
  if (newEmail && newEmail !== client.email) {
    let emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res
        .status(codes.conflict)
        .json(
          new ApiErrorResponse("Email already in use", codes.conflict).res()
        );
    }
    client.email = newEmail;
    updated = true;
  }

  // Username
  if (newUserName && newUserName !== client.userName) {
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
  if (newFullName && newFullName !== client.fullName) {
    client.fullName = newFullName;
    updated = true;
  }

  // Password
  if (newPassword) {
    let isSame = await bcrypt.compare(newPassword, client.password);
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
    client.password = newPassword; // Will be hashed by pre-save hook
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
  client.refreshToken = null;

  await client.save();

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
