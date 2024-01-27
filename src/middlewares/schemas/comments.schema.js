const Joi = require("joi");

const id = Joi.string().uuid();
const videoId = Joi.string().uuid();
const userId = Joi.string().uuid();
const comment = Joi.string().min(1);
const createdAt = Joi.date();

const createCommentSchema = Joi.object({
  videoId: videoId.required(),
  userId,
  comment: comment.required(),
  createdAt: createdAt.required(),
});

const updateCommentSchema = Joi.object({
  comment: comment.required(),
});

const getCommentSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCommentSchema, updateCommentSchema, getCommentSchema };
