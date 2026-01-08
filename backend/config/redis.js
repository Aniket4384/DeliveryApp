const { createClient } = require("redis");
require("dotenv").config();
const redisClient = createClient({
  username: "default",
  // password: process.env.REDIS_PASS,
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-16975.c13.us-east-1-3.ec2.cloud.redislabs.com",
    port: 16975,
  },
});
module.exports = redisClient;
