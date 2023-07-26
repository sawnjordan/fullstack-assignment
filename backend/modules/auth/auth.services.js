const { z } = require("zod");
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");
const MailService = require("../../helpers/email.service");
class AuthServices {
  mailService;
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
        } else if (item.code === "invalid_string") {
          errorBags[item.path[0]] = item.message;
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
      secure: false,
    };
    res.status(statusCode).cookie("token", jwtToken, options).json({
      status: true,
      jwtToken,
      user,
    });
  };

  authorizeRole = (role) => {
    return (req, res, next) => {
      const user = req.user;
      if (!user.role.includes(role)) {
        return res.status(403).json({
          status: "failed",
          response: `Role ${req.user.role} is not allowed to access the resource.`,
        });
      } else {
        next();
      }
    };
  };

  updateUser = async (updateData, userId) => {
    try {
      let data = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
      );
      if (data) {
        return data;
      } else {
        throw { status: 400, msg: "Update failed." };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  sendActivationEmail = async (to, name, message) => {
    try {
      this.mailService = new MailService();
      this.mailService.setMessage({
        to: to,
        sub: "Password Recovery!!!",
        msgBody: message,
        // text: "<b>Hello world?</b>",
      });

      return await this.mailService.sendEmail();
    } catch (error) {
      console.log(error);
    }
  };
}

const authServicesObj = new AuthServices();
module.exports = { AuthServices, authServicesObj };
