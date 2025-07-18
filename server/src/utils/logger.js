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



const logger = (req, res, next) => {

    console.log({
      method: req.method,
      path: `${req.hostname}${req.originalUrl}`,
      statusCode: res.statusCode,
      time: new Date().toLocaleString(),
      parameters: req.params,
      query: req.query,
    });
  

  next();
};

export default logger;
