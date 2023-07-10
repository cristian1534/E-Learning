const express = require("express");
const color = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const redis = require("redis");
const { dbConnection } = require("./database/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const tutorialRoutes = require("./routes/tutorial");
const reactDocRoutes = require("./routes/reactDoc");
const nodeDocRoutes = require("./routes/nodeDoc");
const testDocRoutes = require("./routes/testDoc");
const reduxDocRoutes = require("./routes/reduxDoc");

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
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/tutorial", tutorialRoutes);
app.use("/api/react-doc", reactDocRoutes);
app.use("/api/node-doc", nodeDocRoutes);
app.use("/api/test-doc", testDocRoutes);
app.use("/api/redux-doc", reduxDocRoutes);

app.listen(PORT, () => {
  console.log(color.cyan.bold.underline(`Server running on ${PORT}`));
});

module.exports = app;
