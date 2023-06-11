const mysql = require("mysql2");
const color = require("colors");
const tables = require("./tables");
const { createTable } = require("../helpers/table_creator");
require("dotenv").config();

exports.dbConnection = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    connection.connect((err) => {
      if (err) {
        console.log(
          color.red.bold.underline("Could not connect to MySQL Database.", err)
        );
        reject(err);
      } else {
        console.log(color.green.bold.underline("Connected to MySQL Database."));
        createTable(connection, tables);
        resolve(connection);
      }
    });
  });
};
