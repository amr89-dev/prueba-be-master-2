const User = require("./models/user.model");
const Comment = require("./models/comment.model");
const Video = require("./models/video.model");
const Token = require("./models/token.model");

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
    allowNull: true,
  });

  Video.hasMany(Comment, {
    foreignKey: "videoId",
    as: "comments",
  });

  Comment.belongsTo(Video, {
    foreignKey: "videoId",
    as: "video",
  });

  User.hasMany(Token, {
    foreignKey: "userId",
    as: "tokens",
  });

  Token.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

module.exports = asociations;
