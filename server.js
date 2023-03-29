require("dotenv").config();
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
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
const adminLoginRouter = require("./routes/adminLoginRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", loginRouter);
app.use("/api/admin", adminLoginRouter);

httpServer.listen(port);
module.exports = app;
