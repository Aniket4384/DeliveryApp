const express = require("express")
const userRouter = express.Router()
const userMiddleware = require("../middleware/userMiddleware")
const getUser = require("../controllers/userController")


userRouter.get("/current",userMiddleware,getUser)

module.exports = userRouter
