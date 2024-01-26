const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const {
  errorLog,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const createServer = () => {
  const server = express();
  server.use(express.json());

  const ACCEPTED_ORIGINS = ["http://localhost:3000"];

  const options = {
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  };
  server.use(cors(options));
  require("./utils/auth/index");
  routerApi(server);

  server.use(errorLog);
  server.use(ormErrorHandler);
  server.use(boomErrorHandler);
  server.use(errorHandler);

  return server;
};
module.exports = createServer;
