const Joi = require("joi");

const id = Joi.string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid("admin", "user", "member");

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  loginSchema,
};
