

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import OTPGen from "../utils/OTPGen.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/user.model.js";
import bcrypt form "bcrypt"


let adminSignup=asyncHandler(async(req,res)=>{
let superAdmin=await User.findOne({userName:"synergyHub"})
let {userName,email,fullName,password}=req.body;

  if (isEmptyArr([userName, fullName, email, password]) ) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("mandatory fields are required.", codes.badRequest).res()
      );
  }
  let admin = await User.findOne({$or: [{ email },{userName}] });
  if (admin) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "Admin with Credentials already in user, please login or change credentials",
          codes.conflict
        ).res()
      );
  }
//   let newUser = await User.create(req.body);
//   return res.status(codes.created).json(
//     new ApiResponse("User successfully created", codes.created, {
//       userName: newUser.userName,
//       email:hideEmail(newUser.email)
//     }).res()
//   );

let otp=OTPGen();
superAdmin.otp.code=await bcrypt.hash(otp,10);
superAdmin.otp.expiry=Date.now()+(5*1000*60); //5min
await superAdmin.save()
await sendMail(superAdmin.email,userName,otp)
req.body=req.body;
return next();});

export default adminSignup;

//-----------------------------
