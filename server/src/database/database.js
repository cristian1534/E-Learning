const mysql = require("mysql2");
const color = require("colors");
const tables = require("./tables");
require("dotenv").config();

exports.dbConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

  connection.connect((err) => {
    if (err) {
      console.log(
        color.red.bold.underline("Could not connect to MySQL Database.", err)
      );
      return;
    }
    console.log(color.green.bold.underline("Connected to MySQL Database."));
  });

  function createTables(connection, tables) {
    tables.forEach((table) => {
      connection.query(table.tableQuery, (err) => {
        if (err) {
          console.log(
            color.red.bold.underline(
              `Error creating ${table.tableName} table:`,
              err
            )
          );
          return;
        }
        console.log(
          color.green.bold.underline(
            `Table '${table.tableName}' created successfully.`
          )
        );
      });
    });
  }
};
