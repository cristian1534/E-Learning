const color = require("colors");

exports.createTable = (connection, tables) => {
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
};
