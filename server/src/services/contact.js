const color = require("colors");
const { dbConnection } = require("../database/database");

exports.createMessage = async (name, email, message) => {
  try {
    const connection = await dbConnection();
    const query = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
    const values = [name, email, message];

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error(
            color.red.bold.underline("Could not insert message", err)
          );
          reject(err);
        } else {
          console.log(
            color.green.bold.underline("Message inserted successfully")
          );
          const insertedMessage = {
            id: result.insertId,
            name: name,
            email: email,
            message: message,
          };
          resolve(insertedMessage);
        }
        connection.end();
      });
    });
  } catch (err) {
    return err.message;
  }
};

exports.getMessages = async () => {
  try {
    const connection = await dbConnection();
    const query = "SELECT * FROM contact";

    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          console.error(
            color.red.bold.underline("Could not get messages", err)
          );
          reject(err);
        } else {
          resolve(result);
        }
        connection.end();
      });
    });
  } catch (err) {
    return err.message;
  }
};

exports.deleteMessageById = async (id) => {
  try {
    const connection = await dbConnection();
    const query = "DELETE FROM contact WHERE id = ?";

    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, result) => {
        if (err) {
          console.error(
            color.red.bold.underline("Could not delete message", err)
          );
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  } catch (err) {
    return err.message;
  }
};
