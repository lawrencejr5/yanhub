const mongoose = require("mongoose");

const connectDb = (url) => {
  return mongoose.connect(url, {
    dbName: "yanhub",
  });
};
module.exports = connectDb;
