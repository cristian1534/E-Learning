const { createUser } = require("../../services/user");

exports.create = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) return res.status(400);

    const user = await createUser(name, username, email, password);

    return res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when creating User", error: err.message });
  }
};
