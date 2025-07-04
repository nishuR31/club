import codes from "../constants/codes";
import ApiErrorResponse from "./apiErrorResponse";

export default function asyncHandler(func) {
  return async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (err) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            `Error occured: ${err}`,
            codes.badRequest,
            {},
            err
          ).res()
        );
    }
  };
}
