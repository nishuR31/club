// let logger = (req, res, next) => {
//   console.log({
//     method: req.method,
//     path: `${req.host}${req.url}`,
//     time: new Date().toLocaleTimeString(),
//     parameters: req.params,
//     query: req.query,
//   });
//   next();
// };

// export default logger;


import { performance } from "perf_hooks";

const logger = (req, res, next) => {
  const start = performance.now();

  res.on("finish", () => {
    const duration = performance.now() - start;

    console.log({
      method: req.method,
      path: `${req.hostname}${req.originalUrl}`,
      statusCode: res.statusCode,
      time: new Date().toLocaleString(),
      duration: `${duration.toFixed(2)}ms`,
      parameters: req.params,
      query: req.query,
    });
  });

  next();
};

export default logger;
