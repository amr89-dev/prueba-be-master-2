const Video = require("../models/video.model");
const User = require("../models/user.model");

const findUserIds = async () => {
  const users = await User.findAll();
  return users.map((user) => user.id);
};

const getRandomUserId = async () => {
  const userIds = await findUserIds();
  const randomIndex = Math.floor(Math.random() * userIds.length);
  return userIds[randomIndex];
};

const generateVideoData = async () => {
  const videoData = [
    {
      title: "Video 1",
      description: "Description 1",
      url: "https://www.youtube.com/watch?v=1",
      credits: "Author 1",
      publishedAt: "2020-01-01",
      isPublic: true,
      userId: await getRandomUserId(),
    },
    {
      title: "Video 2",
      description: "Description 2",
      url: "https://www.youtube.com/watch?v=2",
      credits: "Author 2",
      publishedAt: "2020-01-01",
      isPublic: false,
      userId: await getRandomUserId(),
    },
    {
      title: "Video 3",
      description: "Description 3",
      url: "https://www.youtube.com/watch?v=3",
      credits: "Author 3",
      publishedAt: "2020-01-01",
      isPublic: true,
      userId: await getRandomUserId(),
    },
    {
      title: "Video 4",
      description: "Description 4",
      url: "https://www.youtube.com/watch?v=4",
      credits: "Author 4",
      publishedAt: "2020-01-01",
      isPublic: false,
      userId: await getRandomUserId(),
    },
    {
      title: "Video 5",
      description: "Description 5",
      url: "https://www.youtube.com/watch?v=5",
      credits: "Author 5",
      publishedAt: "2020-01-01",
      isPublic: true,
      userId: await getRandomUserId(),
    },
  ];

  return videoData;
};

async function createVideos() {
  try {
    const videoData = await generateVideoData();
    const videoCount = await Video.count();
    if (videoCount <= 0) {
      await Video.bulkCreate(videoData);
      console.log("Videos created");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = createVideos;
