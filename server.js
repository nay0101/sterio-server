require("dotenv").config();
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
// const path = require("path");
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
const adminLoginRouter = require("./routes/adminLoginRouter");
const filmsRouter = require("./routes/filmsRouter");
const userRouter = require("./routes/userRouter");
const subscriptionRouter = require("./routes/subscriptionRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Login
app.use("/api", loginRouter);
app.use("/api/admin", adminLoginRouter);

//Film Control
app.use("/api/film", filmsRouter);

//User Control
app.use("/api/users", userRouter);

//Subscriptions
app.use("/api/subscription", subscriptionRouter);

httpServer.listen(port);
module.exports = app;
