const http = require("http");
const app = require("./config/app");
const mongoose = require("mongoose");
const server = http.createServer(app);

const PORT = 5000;

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_DB,
  })
  .then(server.listen(PORT))
  .then(() => {
    console.log(`Server listening to PORT:${PORT} and connected to DataBase`);
    console.log(`Browser: http://localhost:${PORT} `);
    console.log(`Press CTRL + C to STOP the server`);
  })
  .catch((err) => {
    console.log(err);
  });
