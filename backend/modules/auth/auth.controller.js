const helperObj = require("../../helpers/helpers");
const { authServicesObj } = require("./auth.services");
const UserModel = require("./user.model");
const UserSchema = require("./user.model");
const bcrypt = require("bcryptjs");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      const validData = authServicesObj.validateRegisterData(data);

      const { name, email, password } = validData;

      const isEmailExists = await authServicesObj.ifUserExists(email);

      if (isEmailExists) {
        return res
          .status(400)
          .json({ status: "failed", response: "Email already exists." });
      }
      //password hashing using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await new UserSchema({
        name,
        email,
        password: hashedPassword,
      }).save();

      authServicesObj.generateJWTAndSetCookie(200, newUser, res);

      //   res.status(201).json({ status: "User Created.", response: jwtToken });
    } catch (error) {
      console.log(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(400)
          .json({ status: "failed", response: "Email and Password required." });
      }

      const user = await authServicesObj.ifUserExists(email);
      // console.log(user);

      if (!user) {
        return res
          .status(400)
          .json({ status: "failed", response: "Email doesn't exists." });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ status: "failed", response: "Password is incorrect." });
      }

      authServicesObj.generateJWTAndSetCookie(200, user, res);

      // res.json({ status: "success", response: jwtToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  logoutUser = (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ status: "success", response: "Logged out successfully." });
  };

  getUserProfile = async (req, res, next) => {
    try {
      console.log(req.user);
      const user = await UserModel.findById(req.user.id);
      res.status(200).json({ status: "success", response: user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  getAllUser = async (req, res, next) => {
    try {
      const users = await UserModel.find();
      if (!users) {
        return res
          .status(404)
          .json({ status: "Not Found", response: "No any users found." });
      } else {
        res.status(200).json({ status: "success", response: users });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUserDetails = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          response: `User not found with ID: ${userId}`,
        });
      } else {
        console.log(user);
        res.status(200).json({ status: "success", response: user });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      // console.log(user.id);
      if (!user) {
        res.json({
          status: 404,
          response: "User with the email doesn't exists.",
        });
      } else {
        //get reset token
        const { resetToken } = helperObj.generateResetPasswordToken(user._id);
        // console.log(resetToken);
        const resetURL = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/auth/password-reset/${resetToken}`;
        // console.log(req.get("host"));
        const message = `<p><stong>Dear ${user.name} 🙂,</stong></p><p>Your Password Reset token is as follow:</p><br/> 
        <a href="${resetURL}">${resetURL}</a>
        
        <p>If you have not requested this then you can ignore this.</p>
        
        Regards!`;
        let sendMailSuccess = await authServicesObj.sendActivationEmail(
          user.email,
          user.name,
          message
        );

        res.json({
          status: "success",
          response: `Email Sent:${sendMailSuccess.messageId}`,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

const authControllerObj = new AuthController();
module.exports = { AuthController, authControllerObj };
