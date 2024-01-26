const boom = require("@hapi/boom");
const passport = require("passport");
require("dotenv").config();

const isAuth = () => {
  return (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, _) => {
      if (err) {
        req.isAuth = false;
        return next();
      }
      if (!user) {
        req.isAuth = false;
        return next();
      }
      req.user = user;
      req.isAuth = true;
      next();
    })(req, res, next);
  };
};

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
module.exports = { checkProfile, checkRoles, isAuth };
