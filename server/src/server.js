const express = require("express");
const color = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { dbConnection } = require("./database/database");


const app = express();
dbConnection();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(color.cyan.bold.underline(`Server running on ${PORT}`));
});
