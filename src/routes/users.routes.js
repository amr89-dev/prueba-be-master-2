const express = require("express");
const UserService = require("../services/user.service");
const userService = new UserService();
const userRouter = express.Router();
const validatorHandler = require("./../middlewares/validator.handler");
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require("../middlewares/schemas/user.schema");

userRouter.get("/", async (req, res, next) => {
  try {
    const user = await userService.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    const { body: user } = req;
    try {
      const createdUser = await userService.create(user);
      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }
);
userRouter.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userService.findOne(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.put(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: user } = req;
    try {
      const updatedUser = await userService.update(id, user);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.delete(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedUser = await userService.delete(id);
      res.status(200).json(deletedUser);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = userRouter;
