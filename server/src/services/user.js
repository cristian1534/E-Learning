const color = require("colors");
const { dbConnection } = require("../database/database");

exports.createUser = async (name, username, email, password) => {
  try {
    const connection = await dbConnection();
    const query =
      "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";
    const values = [name, username, email, password];

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error(color.red.bold.underline("Could not insert user", err));
          reject(err);
        } else {
          console.log(color.green.bold.underline("User inserted successfully"));
          const insertedUser = {
            id: result.insertId,
            name: name,
            username: username,
            email: email,
          };
          resolve(insertedUser);
        }
        connection.end();
      });
    });
  } catch (err) {
    return err.message;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const connection = await dbConnection();
    const query = "SELECT * FROM users WHERE email = ?";
    const values = [email];

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error(color.red.bold.underline("Could not insert user", err));
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

exports.getUserById = async (id) => {
  try {
    const connection = await dbConnection();
    const query = "SELECT * FROM users WHERE id = ?";
    const values = [id];

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error(color.red.bold.underline("Could not get user", err));
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

exports.getAll = async () => {
  try {
    const connection = await dbConnection();
    const query = "SELECT id, username, email FROM users";

    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          console.error(color.red.bold.underline("Could not get users", err));
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

exports.updateUserById = async (id, data) => {
  try {
    const connection = await dbConnection();
    const query = "UPDATE users SET ? WHERE id = ?";

    return new Promise((resolve, reject) => {
      connection.query(query, [data, id], (err, result) => {
        if (err) {
          console.error(color.red.bold.underline("Could not update user", err));
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
        connection.end();
      });
    });
  } catch (err) {
    return err.message;
  }
};

exports.deleteUserById = async (id) => {
  try {
    const connection = await dbConnection();
    const query = "DELETE FROM users where id = ?";
    const values = [id];

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error(color.red.bold.underline("Could not delete user", err));
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
