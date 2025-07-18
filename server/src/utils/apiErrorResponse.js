
// ApiErrorResponse

import codes from "../utils/codes.js";

export default class ApiErrorResponse extends Error {
  constructor(
    message = "Api fetched successfully",
    code = codes.badRequest,
    payload = {},
    err = {}
  ) {
    super(err.message || message);
    this.code = code;
    this.payload = payload;
    this.stack=err.stack || Error.captureStackTrace(this, this.constructor);
  }

  res() {
    return {
      message: this.message,
      code: this.code,
      payload: this.payload,
      stack: this.stack,
    };
  }
}
