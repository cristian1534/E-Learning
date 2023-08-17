const redis = require("redis");
const PORT = process.env.PORT || 6379;
const color = require("colors");


const redisConnection = async () => {
  try {
    const client = redis.createClient(PORT);

    client.on("error", (error) => console.error(`Error : ${error}`));

    await client
      .connect()
      .then(() =>
        console.log(color.cyan.bold.underline("Redis connection success"))
      )
      .catch((err) =>
        console.log(
          color.red.bold.underline("Redis connection failed"),
          err.message
        )
      );

    return client;
  } catch (err) {
    return err.message;
  }
};

module.exports = redisConnection;
