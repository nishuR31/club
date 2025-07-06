import jwt from "jsonwebtoken";
import tokenOptions from "../contants/tokenOptions.js"
function accessToken(payload, options = {}) {
  return jwt.sign(payload,process.env.SECRET_ACC, tokenOptions("access"));
}
function refreshToken(payload, options = {}) {
  return jwt.sign(payload, process.env.SECRET_REF, tokenOptions("refresh"));
}

function tokenGeneration(payload) {
  return {
    refreshToken: refreshToken(payload),
    accessToken: accessToken(payload),
  };
}

function verifyAccess(token){
  return jwt.verify(token,process.env.SECRET_ACC)
}
function verifyRefresh(token){
  return jwt.verify(token,process.env.SECRET_REF)
}

export { accessToken, refreshToken, tokenGeneration,verifyAccess,verifyRefresh };
