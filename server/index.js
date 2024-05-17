console.log("Implement servermu disini yak 😝!");

const http = require("http");
const fs = require("fs");
const path = require("path");

const { PORT = 3000 } = process.env;

const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

const onRequest = (req, res) => {
  switch (req.url) {
    case "/":
      req.url = "index.html";
      break;
    case "/cars":
      req.url = "search-cars.html";
      break;
    default:
      break;
  }

  const filePath = path.join(PUBLIC_DIRECTORY, req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(
        fs.readFileSync(path.join(PUBLIC_DIRECTORY, "404.html"), "utf-8")
      );
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
};

const server = http.createServer(onRequest);

server.listen(PORT, "localhost", () => {
  console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
});
