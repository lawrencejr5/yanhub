require("dotenv").config();

// Imports
const express = require("express");
const app = express();
// Security
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
// Routers
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const showsRouter = require("./routes/shows");
const videosRouter = require("./routes/videos");
// Custom Middlewares
const notFound = require("./middlewares/not-found");
const authMiddleware = require("./middlewares/auth");
// Connecting Function
const connectDb = require("./config/conn");

// Middlewares
app.set("trust proxy", 1);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", authMiddleware, tasksRouter);
app.use("/api/v1/shows", authMiddleware, showsRouter);
app.use("/api/v1/videos", authMiddleware, videosRouter);

// Custom Middlewares
app.use(notFound);
app.use(authMiddleware);

// Function to spin off server
const startServer = async () => {
  const port = process.env.PORT || 5000;
  const db = process.env.MONGO_URI;
  try {
    await connectDb(db);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
