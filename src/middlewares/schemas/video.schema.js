const Joi = require("joi");

const id = Joi.string().uuid();
const title = Joi.string().min(1);
const description = Joi.string().min(1);
const url = Joi.string().uri();
const publishedAt = Joi.date();
const credits = Joi.string().min(1);

const createVideoSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  url: url.required(),
  credits: credits.required(),
  publishedAt: publishedAt.required(),
});

const updateVideoSchema = Joi.object({
  title: title,
  description: description,
  credits: credits,
  url: url,
  publishedAt: publishedAt,
});

const getVideoSchema = Joi.object({
  id: id.required(),
});

module.exports = { createVideoSchema, updateVideoSchema, getVideoSchema };
