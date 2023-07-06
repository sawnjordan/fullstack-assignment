const errorHandler = (err, req, res, next) => {
  console.log(err);
  //   console.log("here");
  let statusCode = err.status || 500;
  let msg = err.msg || "Internal Server Error.";
  if (err.name === "CastError") {
    return res.status(401).json({
      status: 401,
      err: err,
      msg: `Invalid value ${err.value} for field: ${err.path}`,
    });
  }

  if (err.type === "registration") {
    // console.log("first");
    // res.render("register.ejs", {
    //   errors: err.msg,
    //   name: err.data?.name,
    //   email: err.data?.email,
    //   password: err.data?.password,
    //   confirm: err.data?.confirm,
    // });
    return res.status(statusCode).json({ data: null, msg: msg, meta: null });
  }
  if (err.type == "login") {
    // console.log("first");
    // res.render("login.ejs", {
    //   errors: err.msg,
    // });
    return res.status(statusCode).json({ data: null, msg: msg, meta: null });
  }
  res.status(statusCode).json({ data: null, msg: msg, meta: null });
};
module.exports = errorHandler;
