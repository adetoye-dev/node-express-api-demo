const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    console.log("Server is active");
    res.write("Hello World!");
    res.end();
  }
});

server.listen(3000);
