const Comment = require("../db/models/comment.model");
const boom = require("@hapi/boom");

class CommentService {
  async create(data) {
    const newComment = await Comment.create(data);
    return newComment;
  }

  async find() {
    const comments = await Comment.findAll();
    return comments;
  }

  async findOne(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw boom.notFound("Comment not found");
    }
    return comment;
  }

  async update(id, changes) {
    const comment = await this.findOne(id);
    const commentUpdated = await comment.update(changes);
    return commentUpdated;
  }

  async delete(id) {
    const comment = await this.findOne(id);
    await comment.destroy();
    return { message: "Comment deleted" };
  }
}

module.exports = CommentService;
