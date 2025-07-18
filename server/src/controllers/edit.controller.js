import User from "../models/user.model.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import codes from "../utils/codes.js";

let edit = asyncHandler(async (req, res) => {
  let { newEmail, newUserName, newFullName, newPassword } = req.body;
  let { email, _id, role, userName } = req.user;

  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not logged in, cannot edit",
          codes.unauthorized
        ).res()
      );
  }

  let client = await User.findOne({ $or: [{ _id }, { userName }, { email }] });
  if (!client) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User dont exists.", codes.notFound).res());
  }

  let sameEmail = newEmail === client.email;
  let samePassword = bcrypt.compare(newPassword, client.password);
  let sameFullName = newFullName === client.fullName;
  let sameUserName = newUserName === client.userName;

  if (sameEmail && sameFullName && samePassword && sameUserName) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "No data has been altered,please provide new data.",
          codes.badRequest
        ).res()
      );
  }

  if (!sameUserName) {
    let user = await User.findOne({ userName: newUserName });
    if (user) {
      return res
        .status(codes.conflict)
        .json(
          new ApiErrorResponse(
            "This username is already in use",
            codes.conflict
          ).res()
        );
    }
    client.userName = newUserName;
  }

  if (!sameEmail) {
    let user = await User.findOne({ email: newEmail });
    if (user) {
      return res
        .status(codes.conflict)
        .json(
          new ApiErrorResponse(
            "This email is already in use",
            codes.conflict
          ).res()
        );
    }
    client.email = newEmail;
  }

  if (!sameFullName) {
    let user = await User.findOne({ fullName: newFullName });
    if (user) {
      return res
        .status(codes.conflict)
        .json(new ApiErrorResponse("This fullName is already in use").res());
    }
    client.userName = newFullName;
  }

  if (samePassword) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "New password must be different from previous one",
          codes.conflict
        ).res()
      );
  }

  client.password = newPassword;
  client.token.refreshToken = null;
  await client.save();

  // Clear all cookies related to authentication
  for (let cookieName in req.cookies) {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  }

  return res
    .status(codes.accepted)
    .json(
      new ApiResponse(
        "Credentials successfully updated, please login.",
        codes.accepted
      ).res()
    );
});

export default edit;
