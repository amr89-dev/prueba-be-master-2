const express = require("express");
const userRoutes = require("./users.routes.js");
const videoRoutes = require("./videos.routes.js");
const commentRoutes = require("./comments.routes.js");
const authRouter = require("./auth.routes.js");

function routerApi(server) {
  const router = express.Router();
  server.use("/api/v1", router);
  router.use("/users", userRoutes);
  router.use("/videos", videoRoutes);
  router.use("/comments", commentRoutes);
  router.use("/auth", authRouter);
}
module.exports = routerApi;
