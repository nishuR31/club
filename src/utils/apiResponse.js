import codes from "../constants/codes.js";

class ApiResponse {
  constructor(
    message = "API fetched successfully",
    code = codes.ok,
    payload = {},
    success = true
  ) {
    this.message = message;
    this.code = code;
    this.payload = payload;
    this.success = success;
  }

  res() {
    return {
      message: this.message,
      code: this.code,
      success: this.success,
      payload: this.payload,
    };
  }
}

export default ApiResponse;
