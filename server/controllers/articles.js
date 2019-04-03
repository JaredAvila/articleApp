let Parser = require("rss-parser");
let parser = new Parser();
module.exports = {
  //returns all current articles
  getAllArticles: (req, res) => {
    //api call to get newest feed of articles
    parser.parseURL(
      "http://export.arxiv.org/api/query?search_query=all:data science+OR+psychiatry+OR+therapy+OR+machine learning&start=0&max_results=20",
      (err, feed) => {
        err
          ? res.json({ message: "error", err })
          : res.json({
              message: "success",
              data: feed
            });
      }
    );
  },
  //returns all current authors
  getAllAuthors: (req, res) => {
    //api call to get feed of articles
    res.json({
      message: "success",
      data: "there is where author data will go"
    });
  }
};
