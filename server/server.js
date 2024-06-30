require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const notFound = require("./middlewares/not-found");
const connectDb = require("./config/conn");

app.use(cors());
app.use(express.json());

app.use(notFound);

const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

const startServer = async () => {
  await connectDb(db);
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
startServer();
