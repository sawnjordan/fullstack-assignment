const { authServicesObj } = require("./auth.services");
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
  };
}

const authControllerObj = new AuthController();
module.exports = { AuthController, authControllerObj };
