var convert = require("xml-js");

module.exports = {
  //returns all current articles
  getAllArticles: (req, res) => {
    //api call to get newest feed of articles

    let result = convert.xml2js(req.body.xmlText, { compact: true });
    res.json({ message: "success", result });
  },
  getAuthor: (req, res) => {
    let result = convert.xml2js(req.body.xml, { compact: true });
    res.json({ message: "success", result });
  }
};
