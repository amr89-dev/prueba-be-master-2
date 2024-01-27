const User = require("../models/user.model.js");

const userData = [
  {
    email: "user@mail.com",
    password: "12345678",
    role: "user",
  },
  {
    email: "admin@mail.com",
    password: "12345678",
    role: "admin",
  },
];

async function createUsers() {
  try {
    const userCount = await User.count();
    if (userCount <= 0) {
      await User.bulkCreate(userData);
      console.log("Users created");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = createUsers;
