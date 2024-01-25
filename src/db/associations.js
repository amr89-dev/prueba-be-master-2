const User = require("./models/user.model");
const Comment = require("./models/comment.model");
const Like = require("./models/like.model");
const Video = require("./models/video.model");

// Associations
const asociations = () => {
  User.hasMany(Video, {
    foreignKey: "userId",
    as: "videos",
  });

  Video.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(Comment, {
    foreignKey: "userId",
    as: "comments",
  });

  Comment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Video.hasMany(Comment, {
    foreignKey: "videoId",
    as: "comments",
  });

  Comment.belongsTo(Video, {
    foreignKey: "videoId",
    as: "video",
  });

  User.hasMany(Like, {
    foreignKey: "userId",
    as: "likes",
  });

  Like.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Video.hasMany(Like, {
    foreignKey: "videoId",
    as: "likes",
  });

  Like.belongsTo(Video, {
    foreignKey: "videoId",
    as: "video",
  });
};

module.exports = asociations;
