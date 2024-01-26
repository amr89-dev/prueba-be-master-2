const boom = require("@hapi/boom");
const User = require("../db/models/user.model");
const bcrypt = require("bcrypt");
const Video = require("../db/models/video.model");

class UserService {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hash,
    };
    const newUser = await User.create(userData);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }

  async findOne(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Video,
          as: "videos",
          attributes: ["id", "title", "description"],
        },
      ],
    });
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const userUpdated = await user.update(changes);
    delete userUpdated.dataValues.password;
    return userUpdated;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: "User deleted" };
  }
}

module.exports = UserService;
