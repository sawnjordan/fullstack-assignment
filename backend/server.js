const http = require("http");

const server = http.createServer();

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
