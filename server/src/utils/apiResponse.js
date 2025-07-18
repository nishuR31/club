// apiResponse

import codes from "../utils/codes.js";

export default class ApiResponse {
  constructor(
    message = "Api fetched successfully",
    code = codes.ok,
    payload = {}
  ) {
    this.message = message;
    this.code = code;
    this.payload = payload;
  }

  res() {
    return {
      message: this.message,
      code: this.code,
      payload: this.payload,
    };
  }
}
