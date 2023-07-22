const crypto = require("crypto");
const UserModel = require("../modules/auth/user.model");
const { authServicesObj } = require("../modules/auth/auth.services");
class Helpers {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  searchBooks = () => {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: `\\b${this.queryStr.keyword}\\b`,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  };

  countBooks = async () => {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: `\\b${this.queryStr.keyword}\\b`,
            $options: "i",
          },
        }
      : {};
    return await this.query.find({ ...keyword }).countDocuments();
  };

  pagination = (resPerPage) => {
    const currentPage = parseInt(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  };

  generateResetPasswordToken = (userId) => {
    //generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hash the token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    console.log(resetPasswordExpire);
    authServicesObj.updateUser(
      { resetPasswordToken, resetPasswordExpire },
      userId
    );
    // console.log(response);

    return { resetToken };
  };

  //set token expire time
}
const helperObj = new Helpers();
module.exports = { helperObj, Helpers };
