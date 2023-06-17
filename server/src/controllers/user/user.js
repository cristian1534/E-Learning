const { getUserById, getAll } = require("../../services/user");

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user.length)
      return res.status(404).json({ message: "User not found" });

    const { name, username, email } = user[0];
    return res.status(200).json({ name, username, email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when searching for user", error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const users = await getAll();
    if (!users.length)
      return res.status(400).json({ message: "Not users found" });
    
    return res.status(200).json(users)
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when searching for user", error: err.message });
  }
};
