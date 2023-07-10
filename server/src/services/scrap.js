const axios = require("axios");
const cheerio = require("cheerio");

exports.scrapeWebsite = async (url) => {
  try {
    let doc = [];
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = $("div.arrow__container.arrow__container--with-link a");

    links.each((index, element) => {
      const href = $(element).attr("href");
      const spanContent = $(element).find("span").text();

      doc.push({ doc: spanContent, url: href });

      // console.log("Span Content:", spanContent);
      // console.log("Href:", url + href);
      // console.log("---------------------------");
    });
    return doc;
  } catch (err) {
    return err.message;
  }
};
