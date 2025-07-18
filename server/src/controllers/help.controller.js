 import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import codes from "../utils/codes.js";

let baseRoute=`/api/v1/synergyHub`

let helperPaths = `
Public Routes
GET    /api/v1${baseRoute}/profile/:username
POST   /api/v1${baseRoute}/signup {userName, email, fullName, password, role}
POST   /api/v1${baseRoute}/signin {userName|email, password, role}
GET     /api/v1${baseRoute}/logout
PATCH   /api/v1${baseRoute}/edit {newEmail, newUserName, newFullName, newPassword}
DELETE  /api/v1${baseRoute}/delete
GET    /api/v1${baseRoute}/token-rotation

Admin Routes
GET     /api/v1${baseRoute}/admin/dashboard
PATCH   /api/v1${baseRoute}/admin/edit {newEmail, newUserName, newFullName, newPassword}
GET    /api/v1${baseRoute}/admin/logout
GET    /api/v1${baseRoute}/admin/token-rotation
POST   /api/v1${baseRoute}/admin/signup {userName, email, fullName, password}->{userName, email, fullName, password,opt}
POST   /api/v1${baseRoute}/admin/signin {userName|email, password, role}
GET   /api/v1${baseRoute}/admin/delete {userName|email, password, role}

synergyHub club Routes
POST    /api/v1${baseRoute}/club/create {name, description, category, logo, banner, socialLinks:{website:instagram:linkedin:github:facebook}}
PATCH   /api/v1${baseRoute}/club/edit/:clubid 
DELETE  /api/v1${baseRoute}/club/delete/:clubid

Utility auth Routes
POST    /api/v1${baseRoute}/forgot-password {email}
POST    /api/v1${baseRoute}/verify-otp {email,otp}
PATCH   /api/v1${baseRoute}/change-password {email|userName, password}
GET   /api/v1${baseRoute}/help 
GET   /api/v1${baseRoute}/ping 

Home Routes
GET   /api/v1${baseRoute}/home 
POST   /api/v1${baseRoute}/home {about,moto,description}
POST    /api/v1/issue {email,detail}
`;

let help = asyncHandler(async (req, res) => {
  return res.status(codes.ok).json(new ApiResponse(helperPaths,codes.ok).res());
});

export default help;
