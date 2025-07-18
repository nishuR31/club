
// logout:/profile/username/logout

import codes from "../utils/codes.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js"

let logout = asyncHandler(async (req, res) => {
let {userName,_id,email,role}=req.user;

if(!req.user){return res.status(codes.badRequest).json(new ApiErrorResponse("Please login before trying to logout.",codes.badRequest,{userName:userName}).res())}

let client=await User.findOne({$or:[{userName},{_id},{email}]})
if(!client){return res.status(codes.notFound).json(new apiErrorResponse("User not found.",codes.notFound).res())}
client.token.refreshToken=null;
await client.save()

// let {userAccessToken,userRefreshToken}=req.cookies
for(let cookieName in req.cookies){
    res.clearCookie(cookieName, {
      httpOnly: true,
        sameSite: "Lax",  // or Lax/Strict
        secure: "None",

    })};
    
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
    .json(new ApiResponse("Successfully logged out", codes.accepted,{userName:client.userName}).res());
});

export default logout;


//------------------------------------