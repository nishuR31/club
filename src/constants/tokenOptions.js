import jwt from "jsonwebtoken";

function accessToken(payload, secret, options) {
  return jwt.sign(payload, secret["access"], options["access"]);
}

function refreshToken(payload, secret, options) {
  return jwt.sign(payload, secret["refresh"], options["refresh"]);
}

function tokenGeneration(payload, secret, options) {
  return {
    accessToken: accessToken(payload, secret, options),
    refreshToken: refreshToken(payload, secret, options),
  };
}

export { accessToken, refreshToken, tokenGeneration };
