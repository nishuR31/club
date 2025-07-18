// ping:/ping/username


import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const ping = asyncHandler(async (req, res) => {
  return res.status(codes.ok).json(new ApiResponse("Server is fired up and database is fueled up.",codes.ok).res())
});

export default ping;

// /--------------------