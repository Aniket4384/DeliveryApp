const express = require("express")
const authRouter = express.Router()
const {signup,signin,logout} = require("../controllers/authentication")
const{userMiddleware,validation} = require("../middleware/userMiddleware")


authRouter.post("/signup", validation, signup)

authRouter.post("/signin",validation, signin)

authRouter.get("/logout", userMiddleware, logout)  // to ensure logedin user only logout

module.exports = authRouter
