const redisConnection = require("../../database/redis");
const { scrapeWebsite } = require("../../services/scrap");

exports.reactDoc = async (req, res) => {
  try {
    const redisClient = await redisConnection();
    const cachedData = await redisClient.get("reactDoc");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    const url = "https://fullstackopen.com/en/part1";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "React Doc not found" });

    await redisClient.set("reactDoc", JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching React Doc" });
  }
};

exports.nodeDoc = async (req, res) => {
  try {
    const redisClient = await redisConnection();
    const cachedData = await redisClient.get("nodeDoc");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    const url = "https://fullstackopen.com/en/part3";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Node Doc not found" });

    await redisClient.set("nodeDoc", JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Node Doc" });
  }
};

exports.testFrontDoc = async (req, res) => {
  try {
    const redisClient = await redisConnection();
    const cachedData = await redisClient.get("testFrontDoc");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    const url = "https://fullstackopen.com/en/part5";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Test Doc not found" });

    await redisClient.set("testFrontDoc", JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Test Doc" });
  }
};

exports.testBackDoc = async (req, res) => {
  try {
    const redisClient = await redisConnection();
    const cachedData = await redisClient.get("testBackDoc");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    const url = "https://fullstackopen.com/en/part4";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Test Doc not found" });

    await redisClient.set("testBackDoc", JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Test Doc" });
  }
};

exports.reduxDoc = async (req, res) => {
  try {
    const redisClient = await redisConnection();
    const cachedData = await redisClient.get("reduxDoc");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    const url = "https://fullstackopen.com/en/part6";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Redux Doc not found" });

    await redisClient.set("reduxDoc", JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Redux Doc" });
  }
};
