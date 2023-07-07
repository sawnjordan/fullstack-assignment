const { z } = require("zod");
const User = require("./user.model");
const bcrypt = require("bcryptjs");
class AuthServices {
  validateRegisterData = (data) => {
    try {
      const validateRegisterSchema = z
        .object({
          name: z.string().nonempty({ message: "Name is required." }),
          email: z.string().email(),
          role: z.string().nullable(),
          password: z
            .string()
            .min(6, { message: "Password must be 6 characters long." })
            .nonempty({ message: "Password is required." }),
          confirm: z
            .string()
            .nonempty({ message: "Confirm Password is required." }),
        })
        .refine((data) => data.password === data.confirm, {
          message: "Passwords don't match",
          path: ["confirm"], // path of error
        });
      return validateRegisterSchema.parse(data);
    } catch (err) {
      console.log(JSON.stringify(err));
      //   console.log("here", data);
      let errorBags = {};
      const errors = err.errors;
      errors?.map((item) => {
        errorBags[item.path[0]] = item.message;
      });
      // res.json(errorBags);
      throw { type: "registration", status: 400, msg: errorBags };
    }
  };

  ifUserExists = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      return user;
    } else {
      return false;
    }
  };

  isPasswordMatch = async (password, userPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, userPassword);
    if (isPasswordCorrect) {
      return true;
    } else {
      return false;
    }
  };

  isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req);
      return next();
    } else {
      res.status(400).json({ response: "Please login to move forward." });
    }
  };

  isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ response: "You are already logged in." });
    } else {
      return next();
    }
  };

  authorizeRoles = (roles) => {};
}
const authServiceObj = new AuthServices();
module.exports = { AuthServices, authServiceObj };
