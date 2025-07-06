
// asyncHandler

import codes from "../contants/codes.js";
import ApiErrorResponse from "./apiErrorResponse.js";

// export default function asyncHandler(func) {
//   return (req, res, next) => {
//     try {
//       return func(req, res, next);
//     } catch (err) {
//       return res
//         .status(codes.badrequest)
//         .json(
//           new ApiErrorResponse(
//             `Error occured : ${err}`,
//             codes.badRequest,
//             {},
//             err
//           ).res()
//         );
//     }
//   };
// }


let asyncHandler=(func)=>async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (err) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            `Error occured : ${err.message ||  err}`,
            codes.badRequest,
            {},
            err
          ).res()
        );
    }
  };

export default asyncHandler;
