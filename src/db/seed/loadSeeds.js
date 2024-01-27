const createUsers = require("./users.seed");
const createVideos = require("./videos.seed");

async function loadSeeds() {
  await createUsers();
  await createVideos();
}

module.exports = loadSeeds;
