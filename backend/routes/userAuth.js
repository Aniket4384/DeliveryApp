const express = require("express")
const authRouter = express.Router()
const {signup,signin,logout,resetPassword,sendOtp,googleAuth} = require("../controllers/authentication")
const {signupValidation,loginValidation} = require("../middleware/validation")
const userMiddleware = require("../middleware/userMiddleware")


authRouter.post("/signup", signupValidation, signup)

authRouter.post("/signin",loginValidation, signin)

authRouter.get("/logout", userMiddleware, logout)  // to ensure logedin user only logout

authRouter.post("/forgot-password",sendOtp)

authRouter.post("/reset-password",resetPassword)

authRouter.post("/google-auth", googleAuth)

module.exports = authRouter
