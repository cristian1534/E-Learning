const mysql = require("mysql");
const color = require("colors");
const tables = require("./tables");
require("dotenv").config();

exports.dbConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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

