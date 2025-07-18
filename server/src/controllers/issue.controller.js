import ApiErrorResponse from "../utils/ApiErrorResponse.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import codes from "../utils/codes.util.js";
import sendMail from "../utils/sendMail.util.js";

let issue = asyncHandler(async (req, res) => {
  let { email, detail } = req.body;
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Cannot raise issue with guest account",
          codes.unauthorized
        ).res()
      );
  }
  await sendMail(email, req.user.userName, detail);
  return res
    .status(codes.ok)
    .json(
      new ApiResponse("Mail sent and issue successfully raised", codes.ok).res()
    );
});

export default issue;
