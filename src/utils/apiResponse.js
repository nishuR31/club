import codes from "../constants/codes.js";

class ApiResponse {
  constructor(
    message = "API fetching successful",
    code = codes.ok,
    payload = {},
    success = true
  ) {
    super(message);
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
