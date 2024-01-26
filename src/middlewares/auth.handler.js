const boom = require("@hapi/boom");
require("dotenv").config();

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
};
const checkProfile = (...profiles) => {
  return (req, res, next) => {
    const user = req.user;

    if (profiles.includes(user.profile)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
};
module.exports = { checkProfile, checkRoles };
