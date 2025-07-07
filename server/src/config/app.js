// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import expressLimit from "express-rate-limit";
// import logger from "../utils/logger.js";
// import codes from "../constants/codes.js";
// import ApiErrorResponse from "../utils/apiErrorResponse.js";
// import cookieParser from "cookie-parser";

// // let limit = expressLimit({
// //   windowMs: 60 * 1000,
// //   limit: 60,
// //   message: "Max limit reached",
// // });

// let app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(logger);
// app.use(morgan("dev"));
// app.use(cors());
// app.use(cookieParser());
// // app.use(limit);

// let baseRoute = "/api/v1";

// app.get("/", (req, res) => {
//   res.status(codes.ok).send("Server fired up");
// });

// app.get(baseRoute, (req, res) => {
//   res.send("Server fired up on baseRoute");
// });

// app.get(`/{*splat}`, (req, res) => {
//   res.status(codes.notFound).json(
//     new ApiErrorResponse("Route not found : Error 404", codes.notFound, {
//       message: "Route not found",
//       route: req.path,
//     }).res()
//   );
// });

// app.get(`${baseRoute}/{*splat}`, (req, res) => {
//   res.status(codes.notFound).json(
//     new ApiErrorResponse("Route not found : Error 404", codes.notFound, {
//       message: "Route not found",
//       route: req.path,
//     }).res()
//   );
// });

// app.get((err, req, res, next) => {
//   res
//     .status(codes.badRequest)
//     .json(
//       new ApiErrorResponse("Error occured", codes.badRequest, {}, err).res()
//     );
// });

// export default app;

import express from "express";
import cors from "cors";
import morgan from "morgan";
// import expressLimit from "express-rate-limit";
import cookie from "cookie-parser";
import logger from "../utils/logger.js";
import codes from "../constants/codes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import forgotRoute from "../routes/forgot.route.js";
import signinRoute from "../routes/signin.route.js";
import signupRoute from "../routes/signup.route.js";
import tokenRotateRoute from "../routes/tokenRotate.route.js";
import editRouter from "../routers/edit.router.js";
import helpRouter from "../routers/help.router.js";
import logoutRouter from "../routers/logout.router.js";
import profileRouter from "../routers/profile.router.js";
import deletionRouter from "../routers/deletion.router.js";
import pingRouter from "../routers/ping.router.js";
import dashboardRouter from "../routers/dashboard.router.js";
import clubRoute from "../routes/club.route.js";

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
app.use(cookie());
// app.use(limit);

let baseRoute = "/api/v1";

app.use(baseRoute, forgotRoute);
app.use(baseRoute, signinRoute);
app.use(baseRoute, signupRoute);
app.use(baseRoute, tokenRotateRoute);
app.use(baseRoute, clubRoute);

app.use(baseRoute, editRouter);
app.use(baseRoute, dashboardRouter);
app.use(baseRoute, helpRouter);
app.use(baseRoute, deletionRouter);
app.use(baseRoute, logoutRouter);
app.use(baseRoute, profileRouter);
app.use(baseRoute, pingRouter);
app.use(baseRoute, dashboardRouter);

app.get(`/*splat`, (req, res) => {
  res.status(codes.notFound).json(
    new ApiErrorResponse(
      "Route after / not found : Error 404",
      codes.notFound,
      {
        message: "Route not found",
        route: req.path,
      }
    ).res()
  );
});

app.get(`${baseRoute}/*splat`, (req, res) => {
  res.status(codes.notFound).json(
    new ApiErrorResponse(
      "Route after /api/v1 not found : Error 404",
      codes.notFound,
      {
        message: "Route not found",
        route: req.path,
      }
    ).res()
  );
});

app.get("/", (req, res) => {
  res.status(codes.ok).send("Server fired up");
});

app.get(baseRoute, (req, res) => {
  res.send("Server fired up on baseRoute");
});

app.get((err, req, res, next) => {
  res
    .status(codes.badRequest)
    .json(
      new ApiErrorResponse(
        `Error occured : ${err}`,
        codes.badRequest,
        {},
        err
      ).res()
    );
});

export default app;
