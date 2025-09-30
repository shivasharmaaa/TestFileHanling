const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <form action="/message"  method = "POST">
      <label>Name:</label>
      <input type="text" name="username">
      <button type="submit">Add</button>
      </form>
      `);
  } else {
    if (url == "/message" && method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        const bufferData = Buffer.concat(body);

        const formvalue = bufferData.toString().split("=")[1];
        fs.writeFile("form.txt", formvalue, (err) => {
          if (err) {
            console.log("some error coming ", err);
          }
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    } else {
      if (url === "/read") {
        fs.readFile("form.txt", "utf8", (err, data) => {
          if (err) {
            console.log("error in reading file", err);
          }
          res.status = 200;
          res.setHeader("Content-Type", "text/html");
          res.end(`<h1>${data}</h1>`);
        });
      }
    }
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
