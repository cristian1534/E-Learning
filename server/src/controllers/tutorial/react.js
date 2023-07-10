const { searchVideos } = require("../../services/videos");

exports.reactVideos = async (req, res) => {
  try {
    const reactTutorials = await searchVideos("react tutorial");
    const data = reactTutorials.videos.map((video) => ({
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`,
    }));
    if (!data || data.length === 0)
      return res.status(404).json({ message: "Videos not found" });
    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error when fetching React videos",
        error: err.message,
      });
  }
};
