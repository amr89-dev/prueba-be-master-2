const Joi = require("joi");

const id = Joi.string().uuid();
const videoId = Joi.string().uuid();
const userId = Joi.string().uuid();
const createdAt = Joi.date();

const createLikeSchema = Joi.object({
  videoId: videoId.required(),
  userId: userId.required(),
  createdAt: createdAt.required(),
});

const getLikeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createLikeSchema, getLikeSchema };
