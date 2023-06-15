const express = require("express");
const color = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const redis = require("redis");
const { dbConnection } = require("./database/database");
const authRoutes = require("./routes/auth");


const app = express();
dbConnection();
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(color.cyan.bold.underline(`Server running on ${PORT}`));
});

module.exports = app;