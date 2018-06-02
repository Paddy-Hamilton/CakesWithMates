/* eslint-disable */
require("dotenv").config({ path: "variables.env" });
/* eslint-enable */
const createServer = require("./createServer");
const server = createServer();
server.start(
  {
    cors: {
      credentials: true,
      origin: ["http://localhost:8080", "https://ph-cakes-test.now.sh"]
    },
    port: 8000,
    endpoint: "/graphql",
    playground: "/playground"
  },
  details => {
    console.log(`Server is running on http://localhost:${details.port}`);
  }
);
