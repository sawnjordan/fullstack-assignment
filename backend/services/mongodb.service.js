const mongoose = require("mongoose");

class MongoDBService {
  _connection;
  db;

  constructor() {
    this.connect();
  }

  connect = async () => {
    // db Connection
    try {
      this._connection = await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to DataBase...");
    } catch (err) {
      console.log(err);
      throw { status: 500, msg: "Error establishing db connection..." };
    }
  };
}

module.exports = MongoDBService;
