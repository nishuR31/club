import jwt from "jsonwebtoken";

function verifyAccess(payload) {
  return jwt.verify(payload, process.env.SECRET_ACC);
}
function verifyRefresh(payload) {
  return jwt.verify(payload, process.env.SECRET_REF);
}
function accessToken(payload) {
  return jwt.sign(payload, process.env.SECRET_ACC, tokenOptions("access"));
}
function refreshToken(payload) {
  return jwt.sign(payload, process.env.SECRET_REF, tokenOptions("refresh"));
}
function tokenGeneration(payload) {
  return {
    accessToken: accessToken(payload),
    refreshToken: refreshToken(payload),
  };
}

export {
  verifyAccess,
  verifyRefresh,
  tokenGeneration,
  accessToken,
  refreshToken,
};
