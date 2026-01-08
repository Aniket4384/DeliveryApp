const User = require("./models/user");
require("dotenv").config;
const redisClient = require("./config/redis");
const express = require("express");
const app = express();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const cors = require("cors");
const port = process.env.PORT || 3000;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRouter);

app.use(express.json());
app.use(cookieParser());

const initializeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]); // for multiple connection
    console.log("db connected");
    app.listen(port, () => {
      console.log("listening at port no. : ", process.env.PORT);
    });
  } catch (err) {
    console.log("Error" + err);
  }
};

initializeConnection();
