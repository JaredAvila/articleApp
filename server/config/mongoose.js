const mongoose = require("mongoose");
module.exports = mongoose.connect(
  "mongodb://jaredavila:one23456@ds113505.mlab.com:13505/ginger-app",
  {
    useNewUrlParser: true
  }
);
