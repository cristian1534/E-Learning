const usetube = require("usetube");

exports.searchVideos = async (title) => {
  try {
    const data = await usetube.searchVideo(title);
    return data;
  } catch (err) {
    return err.message;
  }
};
