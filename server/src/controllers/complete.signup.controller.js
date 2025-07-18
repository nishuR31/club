import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmptyArr from "../utils/isEmptyArr.js";
import hideEmail from "../utils/hideEmail.js";
import User from "../models/user.model.js";

let completeSignup=asyncHandler(async(req,res)=>{
let {otp,userName,email,fullName,password}=req.body;

let superAdmin=await User.findOne({userName:"synergyHub"})

if(!bcrypt.compare(otp,superAdmin.otp.code)){return res.status(codes.badRequest).json(new ApiErrorResponse("Opt mismatched. Please try again.",codes.badRequest).res())}

let user=await User.create({userName,email,fullName,password})

if(!user){return res.status(codes.internalServerError).json(new ApiErrorResponse("Admin registration failed",codes.internalServerError).res())}

return res.status(codes.created).json(new ApiResponse("Admin registered successfully.",codes.created,{userName:user.userName}).res())


})

export default completeSignup;