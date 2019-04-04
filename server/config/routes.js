const path = require("path"),
  articles = require("../controllers/articles");

module.exports = app => {
  //api routes will go here

  //POST - retrieves all articles with xml String
  app.post("/api/articles", (req, res) => {
    articles.getAllArticles(req, res);
  });

  //POST - retrieve author
  app.post("/api/author", (req, res) => {
    articles.getAuthor(req, res);
  });

  //REDIRECT TO ANGULAR IF NO OTHER ROUTES ARE HIT
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("../client/dist/client/index.html"));
  });
};
