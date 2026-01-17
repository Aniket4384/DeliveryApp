const User = require("./models/user");
require("dotenv").config()
const redisClient = require("./config/redis");
const express = require("express");
const app = express();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const shopRouter = require("./routes/shopRoutes");
const itemRouter = require("./routes/item");
const port = process.env.PORT || 3000;


app.use(
  cors({
    origin: ["http://localhost:5173",'http://192.168.1.8:5173',
  'http://192.168.80.1:5173',],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user",userRouter);
app.use("/shop", shopRouter);
app.use("/item",itemRouter)

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
