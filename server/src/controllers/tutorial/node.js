const { searchVideos } = require("../../services/videos");
const client = require("../../database/redis")

exports.nodeVideos = async (req, res) => {
  try {
    // Check if the data is in Redis cache
    client.get("node_videos", async (err, cachedData) => {
      if (err) {
        console.error("Redis Error:", err);
      }

      if (cachedData) {
        // Data found in cache, return cached data
        const parsedData = JSON.parse(cachedData);
        return res.status(200).json(parsedData);
      } else {
        // Data not in cache, fetch from the service
        const nodeTutorials = await searchVideos("node tutorial");
        const data = nodeTutorials.videos.map((video) => ({
          id: video.id,
          title: video.title,
          url: `https://www.youtube.com/watch?v=${video.id}`,
        }));

        if (!data || data.length === 0) {
          return res.status(404).json({ message: "Videos not found" });
        }

        // Store data in Redis cache for future use
        client.setex("node_videos", 3600, JSON.stringify(data)); // Cache for 1 hour (3600 seconds)

        return res.status(200).json(data);
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error when fetching Node.js videos",
      error: err.message,
    });
  }
};
