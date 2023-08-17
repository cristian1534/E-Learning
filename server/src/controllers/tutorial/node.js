const { searchVideos } = require("../../services/videos");
const redisConnection = require("../../database/redis");

exports.nodeVideos = async (req, res) => {
  try {
    const redisClient = await redisConnection();
    const cachedData = await redisClient.get("nodeVideosCache");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    const nodeTutorials = await searchVideos("node tutorial");
    const data = nodeTutorials.videos.map((video) => ({
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`,
    }));

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Videos not found" });
    }

    await redisClient.set("nodeVideosCache", JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Error when fetching React videos",
      error: err.message,
    });
  }
};
