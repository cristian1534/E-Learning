const { getUserById } = require("../../services/user");

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if(!user.length) return res.status(404).json({ message: "User not found"})

    const { name, username, email } = user[0];
    return res.status(200).json({ name, username, email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when searching for user", error: err.message });
  }
};
