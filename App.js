const http = require("http");
const handle = require("./routes");

const server = http.createServer(handle);

const port = 3000;
server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
