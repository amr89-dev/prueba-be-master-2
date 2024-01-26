const express = require("express");
const router = express.Router();
const VideoService = require("../services/video.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createVideoSchema } = require("../middlewares/schemas/video.schema");
const { isAuth } = require("../middlewares/auth.handler");
const videoService = new VideoService();

router.get("/", isAuth(), async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const videos = await videoService.findPublic();
      return res.status(200).json(videos);
    }
    const videos = await videoService.findAll();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

router.get("/:videoId", isAuth(), async (req, res, next) => {
  const { videoId } = req.params;
  try {
    if (!req.isAuth) {
      const video = await videoService.findOnePublic(videoId);
      return res.status(200).json(video);
    }
    const video = await videoService.findOne(videoId);
    res.status(200).json(video);
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

router.put("/:videoId", async (req, res, next) => {
  const { videoId } = req.params;
  try {
    const video = await videoService.update(videoId, req.body);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
});

router.delete("/:videoId", async (req, res, next) => {
  const { videoId } = req.params;
  try {
    await videoService.delete(videoId);
    res.status(200).json({ message: "Video deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
