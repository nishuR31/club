import codes from "../constants/codes.js";

export default class ApiErrorResponse extends Error {
  constructor(
    message = "something broke",
    code = codes.badRequest,
    payload = {},
    err = {},
    success = !true
  ) {
    super(err.message || message);
    this.code = code;
    this.success = success;
    this.payload = payload;
    this.err = err;
    this.stack = err.stack || Error.captureStackTrace(this, this.contructor);
  }

  res(dev = true) {
    return {
      message: this.message,
      code: this.code,
      payload: this.payload,
      err: this.err,
      sucess: this.success,
      stack: dev ? this.stack : null,
    };
  }
}
