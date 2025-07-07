// profile:/profile/username

import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const profile = asyncHandler(async (req, res) => {
  const { username,user } = req.params;
  const { userName, email, _id, roles } = req.user || {};
  const client = await User.findOne({ $or:[{userName: username},{email},{_id}] });

  if (!client) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          `No client found with ${username}`,
          codes.notFound
        ).res()
      );
  }

  // Prepare response payload based on whether client is accessing their own profile
  let payload = {};

  if (userName && userName === username) {
    // Self profile - return full details
    payload = {
      id: client._id,
      client: client.userName,
      fullName: client.fullName,
      email: client.email,
      roles: client.roles,
    };
  } else {
    // Public view - restrict details
    payload = {
      client: client.userName,
      fullName: client.fullName,
    };
  }

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(`Viewing client: ${username}`, codes.ok, payload).res()
    );
});

export default profile;
