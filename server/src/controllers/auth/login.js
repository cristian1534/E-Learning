const bcrypt = require("bcrypt");
const { createToken } = require("../../helpers/token_creator");
const { getUserByEmail } = require("../../services/user");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user.length)
      return res.status(404).json({ message: "Email not found" });

    const validated_password = await bcrypt.compare(password, user[0].password);
    if (!validated_password)
      return res.status(400).json({ message: "Wrong Email or Password" });

    const token = createToken(user[0]);

    return res.status(200).json({
      name: user[0].name,
      username: user[0].username,
      email: user[0].email,
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not Log In", error: err.message });
  }
};
