const {
  createMessage,
  getMessages,
  deleteMessageById,
} = require("../../services/contact");

exports.create = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400);

    const contact = await createMessage(name, email, message);
    return res
      .status(200)
      .json({ message: "Message sent successfully", contact });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when creating message", error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const messages = await getMessages();
    if (!messages.length)
      return res.status(404).json({ message: "Messages not found" });

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({ message: "Error when getting messages" });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await deleteMessageById(id);
    if (!deletedMessage)
      return res.status(404).json({ message: "Message not found" });

    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error when deleting message" });
  }
};
