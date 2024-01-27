const express = require("express");
const router = express.Router();
const CommentService = require("../services/comment.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCommentSchema,
  updateCommentSchema,
} = require("../middlewares/schemas/comments.schema");
const commentService = new CommentService();

router.get("/", async (req, res, next) => {
  try {
    const comments = await commentService.find();
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validatorHandler(createCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const comment = await commentService.create(req.body);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentService.findOne(id);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validatorHandler(updateCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await commentService.update(id, req.body);
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await commentService.delete(id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
