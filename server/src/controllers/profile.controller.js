// profile:/profile/username

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Client from "../models/client.model.js"



const profile = asyncHandler(async (req, res) => {
let {username}=req.params;
const client = await User.findOne(userName: username);



  if (!client) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          `No user found with ${username}`,
          codes.notFound
        ).res()
      );
  }


let user=await Client.findOne(user:client._id).project("User");

if(!user){return res.status(codes.notFound).json(new ApiErrorResponse("User not found.",codes.notFound).res())}

  let payload= req.user? req.user.userName===userName?{userName:user.user.userName,email:user.user.email,fullName:user.user.fullName,bio:user.bio,badges:user.badges,gender:user.gender,profileCompleted:user.profileCompleted}:
  {userName:user.user.userName,email:hideEmail(user.user.email),fullName:user.user.fullName,bio:user.bio,badges:user.badges,gender:user.gender} :{
    userName:user.user.userName,email:hideEmail(user.user.email),fullName:user.user.fullName,bio:user.bio
  }


  // Prepare response payload based on whether user is accessing their own profile

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(`Viewing user: ${username}`, codes.ok, payload).res()
    );
});

export default profile;


//--------------------------------
