require("dotenv").config();
const http = require("http");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL || "mongodb://127.0.0.1/sterio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
const port = process.env.PORT || "4000";
const httpServer = http.createServer(app);

const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/usersRouter");
const friendsRouter = require("./routes/friendsRouter");
const friendRequestsRouter = require("./routes/friendRequestsRouter");
const chatRouter = require("./routes/chatRouter");

app.use("/api", loginRouter);
app.use("/api/users", verify_token, usersRouter);
app.use("/api/friends", verify_token, friendsRouter);
app.use("/api/friend_requests", verify_token, friendRequestsRouter);
app.use("/api/chat", verify_token, chatRouter);

httpServer.listen(port);
module.exports = app;
