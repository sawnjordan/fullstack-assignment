const jwt = require("jsonwebtoken");
const UserModel = require("../modules/auth/user.model");
const isUserAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        status: "failed",
        response: "Login first to access the resourse.",
      });
    }
    //   console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //   console.log("decoded", decoded);
    const user = await UserModel.findById(decodedToken.id);
    //   console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isUserAuthenticated };
