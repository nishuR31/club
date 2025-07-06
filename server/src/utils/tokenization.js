import jwt from "jsonwebtoken";
import tokenOptions from "../constants/tokenOptions.js";
function accessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_ACC, tokenOptions("access"));
}
function refreshToken(payload) {
  return jwt.sign(payload, process.env.SECRET_REF, tokenOptions("refresh"));
}

function tokenGeneration(payload) {
  return {
    refreshToken: refreshToken(payload),
    accessToken: accessToken(payload),
  };
}

function verifyAccess(token) {
  return jwt.verify(token, process.env.SECRET_ACC);
}
function verifyRefresh(token) {
  return jwt.verify(token, process.env.SECRET_REF);
}

export {
  accessToken,
  refreshToken,
  tokenGeneration,
  verifyAccess,
  verifyRefresh,
};
