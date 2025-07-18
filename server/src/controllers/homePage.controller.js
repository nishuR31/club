import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const homePage = asyncHandler(async (req, res) => {
  //home
  const data = await Home.findOne({ home: "home" });
  const addFields = await Home.aggregate([
    { $match: { home: "home" } },
    {
      $addFields: {
        totalClubs: { $size: "$clubs" },
      },
    },
  ]);

  if (!addFields || addFields.length === 0) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("Data not found or No clubs created", codes.notFound).res()
      );
  }

  return res
    .status(codes.found)
    .json(
      new ApiResponse("Data found, Loading..", codes.found, {
        about: data.about,
        moto: data.moto,
        description: data.description,
        clubs: data.clubs,
        totalClubs: addFields[0]?.totalClubs,
        copyRight: data.copyRight,
        madeBy: data.madeBy,
      })
    )
    .res();
});

export default homePage;

//---------------------
