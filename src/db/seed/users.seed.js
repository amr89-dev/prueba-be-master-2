const bcrypt = require("bcrypt");
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

const generateUserData = async () => {
  const users = userData.map(async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    return {
      ...user,
      password: hash,
    };
  });

  return Promise.all(users);
};

async function createUsers() {
  try {
    const userData = await generateUserData();
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
