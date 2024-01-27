const express = require("express");
const router = express.Router();
const CommentService = require("../services/comment.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCommentSchema,
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

module.exports = router;
