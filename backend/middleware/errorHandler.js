const errorHandler = (err, req, res, next) => {
  // console.log(err);
  console.log("errorHandler Middleware");
  let statusCode = err.status || 500;
  let msg = err.msg || "Internal Server Error.";
  if (err.name === "CastError") {
    return res.status(401).json({
      status: 401,
      err: err,
      msg: `Invalid value ${err.value} for field: ${err.path}`,
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(400).json({
      status: 401,
      err: err,
      msg: `JSON Web Token is invalid. Please login again.`,
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(400).json({
      status: 401,
      err: err,
      msg: `JSON Web Token is expired. Please login again.`,
    });
  }
  res.status(statusCode).json({ data: null, msg: msg, meta: null });
};
module.exports = errorHandler;
