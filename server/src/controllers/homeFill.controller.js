import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Home from "../models/home.model.js";

let homeFill = asyncHandler(async (req, res) => {
  //home
  const body = req.body;

  const updatedHome = await Home.findOneAndUpdate(
    { home: "home" },
    { $set: body },
    {
      new: true,
      upsert: true, // Create if not exists
      runValidators: true,
    }
  );

  if (!updatedHome) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Failed to update or create Home document",
          codes.badRequest
        ).res()
      );
  }

  return res
    .status(codes.found)
    .json(
      new ApiResponse("Home data created or updated", codes.found, {
        about: updatedHome.about,
        moto: updatedHome.moto,
        description: updatedHome.description,
        clubs: updatedHome.clubs,
        copyRight: updatedHome.copyRight,
        madeBy: updatedHome.madeBy,
      })
    )
    .res();
});

export default homeFill;
