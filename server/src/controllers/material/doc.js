const { scrapeWebsite } = require("../../services/scrap");

exports.reactDoc = async (req, res) => {
  try {
    const url = "https://fullstackopen.com/en/part1";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "React Doc not found" });
    
    
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching React Doc" });
  }
};

exports.nodeDoc = async (req, res) => {
  try {
    const url = "https://fullstackopen.com/en/part3";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Node Doc not found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Node Doc" });
  }
};



exports.testFrontDoc = async (req, res) => {
  try {
    const url = "https://fullstackopen.com/en/part5";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Test Doc not found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Test Doc" });
  }
};

exports.testBackDoc = async (req, res) => {
  try {
    const url = "https://fullstackopen.com/en/part4";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Test Doc not found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Test Doc" });
  }
};

exports.reduxDoc = async (req, res) => {
  try {
    const url = "https://fullstackopen.com/en/part6";
    const data = await scrapeWebsite(url);
    if (!data) return res.status(404).json({ message: "Redux Doc not found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error when fetching Redux Doc" });
  }
};
