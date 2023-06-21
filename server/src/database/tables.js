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
  {
    tableName: "contact",
    tableQuery: `
        CREATE TABLE IF NOT EXISTS contact (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50),
          email VARCHAR(50),
          message VARCHAR(250)
        )
    `,
  },
];

module.exports = tables;
