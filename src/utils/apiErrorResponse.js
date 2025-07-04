import codes from "../constants/codes";

export default class ApiErrorResponse extends Error {
  constructor(
    message = "Something broke while fetching",
    code = codes.badRequest,
    payload = {},
    err = {}
  ) {
    super(err.message || message);
    this.code = code;
    this.payload = payload;
    this.stack = err.stack || Error.captureStackTrace(this, this.constructor);
  }
  res(dev = true) {
    return {
      message: this.message,
      code: this.code,
      payload: this.payload,
      stack: dev ? this.stack : null,
      success: false,
    };
  }
}
