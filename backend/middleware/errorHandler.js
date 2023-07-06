const errorHandler = (err, req, res, next) => {
  // console.log(err);
  console.log("here");
  let statusCode = err.status || 500;
  let msg = err.msg || "Internal Server Error.";
  if (err.name === "CastError") {
    return res.status(401).json({
      status: 401,
      err: err,
      msg: `Invalid value ${err.value} for field: ${err.path}`,
    });
  }
  res.status(statusCode).json({ data: null, msg: msg, meta: null });
};
module.exports = errorHandler;
