import codes from "../constants/codes";

export default class ApiResponse {
  constructor(
    message = "Something broke while fetching",
    code = codes.badRequest,
    payload = {},
    err = {}
  ) {
    this.code = code;
    this.payload = payload;
  }
  res() {
    return {
      message: this.message,
      code: this.code,
      payload: this.payload,
      success: true,
    };
  }
}
