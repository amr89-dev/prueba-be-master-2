const express = require("express");
const router = express.Router();
const VideoService = require("../services/video.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createVideoSchema } = require("../middlewares/schemas/video.schema");
const videoService = new VideoService();

router.get("/", async (req, res, next) => {
  try {
    const videos = await videoService.findPublic();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validatorHandler(createVideoSchema, "body"),
  async (req, res, next) => {
    try {
      const video = await videoService.create(req.body);
      res.status(201).json(video);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
