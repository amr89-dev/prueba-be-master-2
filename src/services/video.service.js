const Video = require("../db/models/video.model");
const boom = require("@hapi/boom");

class VideoService {
  async create(data) {
    const newVideo = await Video.create(data);
    return newVideo;
  }

  async find() {
    const videos = await Video.findAll();
    return videos;
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

  async delete(id) {
    const video = await this.findOne(id);
    await video.destroy();
    return { message: "Video deleted" };
  }
}

module.exports = VideoService;
