const { authServiceObj } = require("./auth.services");
const bcrypt = require("bcryptjs");
const Users = require("./user.model");
const passport = require("passport");
const userModel = require("./user.model");
class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      let validData = authServiceObj.validateRegisterData(data);
      const { name, email, password } = validData;
      let emailExists = await authServiceObj.ifUserExists(validData.email);
      if (emailExists) {
        return res.status(400).json({ response: "Email already exists." });
      } else {
        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new Users({
          name,
          email,
          password: hashedPassword,
        }).save();
        // const user = newUser.save();
        console.log(`User Created: ${newUser}`);
        res.status(201).json({ status: "success", response: newUser });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  loginUser = () => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
      failureFlash: true,
    });
  };

  getAllUsers = async (req, res, next) => {
    const users = await userModel.find();
    console.log(users);
    res.json({ response: users });
  };
}

const authControllerOjb = new AuthController();
module.exports = { AuthController, authControllerOjb };
