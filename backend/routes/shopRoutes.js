const express = require("express")
const shopRouter = express.Router()
const userMiddleware = require("../middleware/userMiddleware")
const {createShop, getShop, getShopByCity} = require("../controllers/shopController")
const upload = require("../middleware/multer")


shopRouter.post("/createShop",userMiddleware,upload.single("image"),createShop)
shopRouter.get("/getShop",userMiddleware, getShop)
shopRouter.get("/getShopByCity/:city", getShopByCity)

//upload.single->> for single images
//upload.fields->> for multiple images

module.exports = shopRouter
