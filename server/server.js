const http = require("http");

require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./config/db.config");

const port = process.env.PORT || 8087;
// const port = 8081;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

startServer();
