import express from "express";
import cors from "cors";
import morgan from "morgan";
import expressLimit from "express-rate-limit";
import logger from "../utils/logger.js";
import codes from "../contants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";

// let limit = expressLimit({
//   windowMs: 60 * 1000,
//   limit: 60,
//   message: "Max limit reached",
// });

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(morgan("dev"));
app.use(cors());
// app.use(limit);

let baseRoute = "/api/v1";

app.get("/", (req, res) => {
  res.status(codes.ok).send("Server fired up");
});

app.get(baseRoute, (req, res) => {
  res.send("Server fired up on baseRoute");
});

app.get(`/{*splat}`, (req, res) => {
  res.status(codes.notFound).json(
    new ApiErrorResponse("Route not found : Error 404", codes.notFound, {
      message: "Route not found",
      route: req.path,
    }).res()
  );
});

app.get(`${baseRoute}/{*splat}`, (req, res) => {
  res.status(codes.notFound).json(
    new ApiErrorResponse("Route not found : Error 404", codes.notFound, {
      message: "Route not found",
      route: req.path,
    }).res()
  );
});

app.get((err, req, res, next) => {
  res
    .status(codes.badRequest)
    .json(
      new ApiErrorResponse("Error occured", codes.badRequest, {}, err).res()
    );
});

export default app;
