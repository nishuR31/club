import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Admin from "../models/admin.model.js";
import Club from "../models/club.model.js";
import Client from "../models/client.model.js";

let dashboardData = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.roles.includes("admin")) {
    return res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Admin login required, access denied!").res());
  }

  // -------- Clients ----------
  const clients = await Client.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        userName: "$user.userName",
        fullName: "$user.fullName",
        email: "$user.email",
        roles: "$user.roles",
      },
    },
  ]);

  // -------- Admins ----------
  const admins = await Admin.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        userName: "$user.userName",
        fullName: "$user.fullName",
        email: "$user.email",
        roles: "$user.roles",
      },
    },
  ]);

  // -------- Clubs ----------
  const clubs = await Club.aggregate([
    // Lookup createdBy
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "creator",
      },
    },
    { $unwind: "$creator" },

    // Lookup members
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "memberUsers",
      },
    },

    {
      $project: {
        _id: 1,
        name: 1, // club name if any
        createdBy: {
          userName: "$creator.userName",
          email: "$creator.email",
          fullName: "$creator.fullName",
        },
        members: {
          $map: {
            input: "$memberUsers",
            as: "m",
            in: {
              userName: "$$m.userName",
              email: "$$m.email",
              fullName: "$$m.fullName",
            },
          },
        },
      },
    },
  ]);

  return res.status(codes.ok).json(
    new ApiResponse("Welcome to admin dashboard", codes.ok, {
      admin: req.user.userName,
      totalClients: clients.length,
      totalClubs: clubs.length,
      totalAdmins: admins.length,
      clients,
      admins,
      clubs,
    }).res()
  );
});

export default dashboardData;
