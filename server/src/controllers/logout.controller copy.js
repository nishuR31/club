
// logout:/profile/username/logout

import codes from "../contants/codes.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js"

let logout = asyncHandler(async (req, res) => {
let {username} = req.params;
let {userName,_id,email,role}=req.user;

if(username!==userName){return res.status(codes.conflict).json(new ApiErrorResponse("Cant logout from other's account",codes.conflict,{username:username}).res())}

let client=await User.findOne({$or:[{userName},{_id},{email}]})
client.refreshToken=null;
await client.save()

let {userAccessToken,userRefreshToken}=req.cookies
    res.clearCookie(cookieName, {
      httpOnly: true,
        sameSite: "Lax",  // or Lax/Strict
        secure: "None",

    });
    
//   res.clearCookie("userAccessToken", {
//   httpOnly: true,
//   sameSite: "Lax",
//   secure: false, // match original; NOT "None" — it's a boolean
// });

// res.clearCookie("userRefreshToken", {
//   httpOnly: true,
//   sameSite: "Lax",
//   secure: false,
// });


  return res
    .status(codes.accepted)
    .json(new ApiResponse("Successfully logged out", codes.accepted).res());
});

export default logout;
