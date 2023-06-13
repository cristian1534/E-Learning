// tablas.js
const tables = [
  {
    tableName: "users",
    tableQuery: `
        CREATE TABLE IF NOT EXISTS users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50),
          username VARCHAR(50),
          email VARCHAR(50),
          password VARCHAR(100)
        )
      `,
  },
];

module.exports = tables;
