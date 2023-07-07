const { z } = require("zod");
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");
class AuthServices {
  validateRegisterData = (data) => {
    try {
      const validationSchema = z.object({
        name: z
          .string()
          .min(3, {
            message: "Name must be of atlest 3 characters",
          })
          .max(50)
          .nonempty(),
        email: z.string().email().nonempty(),
        password: z
          .string()
          .nonempty({ message: "Password is required." })
          .min(8, { message: "Password must be 8 charaters long." }),
      });
      let response = validationSchema.parse(data);
      return response;
    } catch (error) {
      console.log(error);
      // console.log("first");
      // console.log(JSON.stringify(error));
      const errors = error.errors;
      let errorBags = {};
      errors?.map((item) => {
        if (item.code == "invalid_type") {
          errorBags[item.path[0]] = `${item.path[0]} is ${item.message}`;
        } else if (
          item.code == "too_small" ||
          item.code == "custom" ||
          item.code == "too_big"
        ) {
          errorBags[item.path[0]] = item.message;
        } else {
        }
      });
      // console.log(errorBags);
      throw { status: 400, msg: errorBags };
    }
  };

  ifUserExists = async (email) => {
    const user = await UserModel.findOne({ email });
    if (user) {
      return user;
    } else {
      return false;
    }
  };

  generateJWTAndSetCookie = (statusCode, user, res) => {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", jwtToken, options).json({
      status: "success",
      jwtToken,
      user,
    });
  };
}

const authServicesObj = new AuthServices();
module.exports = { AuthServices, authServicesObj };
