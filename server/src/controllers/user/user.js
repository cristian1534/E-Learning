const {
  getUserById,
  getAll,
  updateUserById,
  deleteUserById,
} = require("../../services/user");

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

    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when searching for user", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedUser = await updateUserById(id, data);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when updating user", error: err.message });
  }
};

exports.deleteOne= async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
  
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when deleting user", error: err.message });
  }
};
