import express from "express";
import cookie from "cookie-parser";
import morgon from "morgan";
import cors from "cors";
import isEmpty from "../utils/isEmpty.js";
import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookie());
app.use(morgon("dev"));

app.get("/", (req, res) => {
  res.send("client");
});

app.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  if (isEmpty([id])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Some credentials are missing",
          codes.badRequest
        ).res()
      );
  }

  let user = await User.findById(id);
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Failed to register", codes.notFound).res());
  }

  return res.status(codes.found).json(
    new ApiResponse("User found successfully", codes.found, {
      username: user.userName,
      _id: user._id,
      email: user.email,
    }).res()
  );
});

app.post("/signup", async (req, res) => {
  try {
    let data = req.body;
    let { userName, email, password, fullName } = data;
    if (isEmpty([userName, email, password, fullName])) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            "Some credentials are missing",
            codes.badRequest
          ).res()
        );
    }
    let user = await User.findOne({ userName, $or: [{ email }] });
    if (user) {
      return res.status(codes.conflict).json(
        new ApiErrorResponse("User already exists", codes.conflict, {
          username: User.userName || userName,
        }).res()
      );
    }

    let newUser = await User.create(data);
    if (!newUser) {
      return res
        .status(codes.internalServerError)
        .json(
          new ApiErrorResponse(
            "Failed to register",
            codes.internalServerError
          ).res()
        );
    }

    return res.status(codes.created).json(
      new ApiResponse("User registered successfully", codes.created, {
        username: userName,
      }).res()
    );
  } catch (err) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Some error occured",
          codes.badRequest,
          {},
          err
        ).res()
      );
  }
});

app.get("/sagar", (req, res) => {
  res.json({ message: "Sagar" });
});

export default app;
