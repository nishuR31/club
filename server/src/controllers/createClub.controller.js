import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import isEmpty from "../utils/isEmpty.js";
import codes from "../constants/codes.js";
import Club from "../models/club.model.js";

const createClub = asyncHandler(async (req, res) => {
  const { name, description, category, logo, banner, socialLinks } = req.body;

  // 1. Auth check
  if (!req.user || !req.user._id) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Unauthorized: login required",
          codes.unauthorized
        ).res()
      );
  }

  // 2. Role check (adjust roles as needed)
  if (!["admin","creator"].some(role => ["admin","creator"].includes(req.user.roles))) {
    return res
      .status(codes.forbidden)
      .json(
        new ApiErrorResponse(
          "You are not allowed to create a club",
          codes.forbidden
        ).res()
      );
  }

  // 3. Validation
  if (isEmpty([name, description, category])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Club credentials are required",
          codes.badRequest
        ).res()
      );
  }

  // 4. Check if club already exists
  const existing = await Club.findOne({ name: name});
  if (existing) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Club with this name already exists",
          codes.conflict
        ).res()
      );
  }

  // 5. Create the club
  const club = await Club.create({
    name: name,
    description,
    category,
    logo,
    banner,
    socialLinks,
    createdBy: user._id,
    members: [user._id], // creator is also first member
  });

  return res
    .status(codes.created)
    .json(
      new ApiResponse("Club created successfully", codes.created, club).res()
    );
});

export default createClub;
