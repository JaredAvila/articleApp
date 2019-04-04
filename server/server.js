const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  port = 8000;

//bring in middleware
app.use(bodyParser.json({ limit: "50mb" }));

//serve Angular app
app.use(express.static(__dirname + "../../client/dist/client"));

require("./config/routes")(app);

app.listen(port, () => console.log(`listening on port ${port}`));
