const path = require("path"),
  articles = require("../controllers/articles");

module.exports = app => {
  //api routes will go here

  //GET - retrieves all articles
  app.get("/api/articles", (req, res) => {
    articles.getAllArticles(req, res);
  });

  //REDIRECT TO ANGULAR IF NO OTHER ROUTES ARE HIT
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("../client/dist/client/index.html"));
  });
};
