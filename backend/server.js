const http = require("http");
const app = require("./config/app");
const server = http.createServer(app);

const PORT = 5000;

server.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server listening to PORT:${PORT}`);
    console.log(`Browser: http://localhost:${PORT} `);
    console.log(`Press CTRL + C to STOP the server`);
  } else {
    console.log(err);
  }
});
