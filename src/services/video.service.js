const Comment = require("../db/models/comment.model");
const Like = require("../db/models/like.model");
const Video = require("../db/models/video.model");
const boom = require("@hapi/boom");

class VideoService {
  async create(data) {
    const newVideo = await Video.create(data);
    return newVideo;
  }

  async findPublic() {
    const videos = await Video.findAll({
      where: { isPublic: true },
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "userId"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "userId"],
        },
      ],
    });
    return videos;
  }

  async findAll() {
    const videos = await Video.findAll({
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "userId"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "userId"],
        },
      ],
    });
    return videos;
  }
  async findPublicByUserId(userId) {
    const videos = await Video.findAll({
      where: { userId, isPublic: true },
    });
    return videos;
  }

  async findOnePublic(id) {
    const video = await Video.findOne({
      where: { id, isPublic: true },
    });
    if (!video) {
      throw boom.notFound("Video not found");
    }
    return video;
  }

  async findOne(id) {
    const video = await Video.findByPk(id);
    if (!video) {
      throw boom.notFound("Video not found");
    }
    return video;
  }

  async update(id, changes) {
    const video = await this.findOne(id);
    const videoUpdated = await video.update(changes);
    return videoUpdated;
  }
  async updateLikes(id) {
    const video = await this.findOne(id);
    const videoUpdated = await video.update({ like: video.like + 1 });
    return videoUpdated;
  }

  async delete(id) {
    const video = await this.findOne(id);
    await video.destroy();
    return { message: "Video deleted" };
  }
}

module.exports = VideoService;
