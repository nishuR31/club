// delete: profile/username/delete

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Club from "../models/club.model.js";


let deletionClub=asyncHandler(async(req,res)=>{
let {id}=req.params;
if(!req.user){return res.status(codes.unauthorized).json(new ApiErrorResponse("Cannot delete club without login",codes.unauthorized).res())}
let club=await Club.findByIdAndDelete(id);
if(!club){return res.status(codes.notFound).json(new ApiErrorResponse("Club not found.",codes.notFound).res())}
return res.status(codes.accepted).json(new ApiResponse("Club successfully deleted",codes.accepted).res())
})

export default deletionClub;