const express = require("express")
const itemRouter = express.Router()
const upload = require("../middleware/multer")
const userMiddleware = require("../middleware/userMiddleware")
const createShop = require("../controllers/shopController")
const { addItem, getItem, editItem, deleteItem, getItemByCity } = require("../controllers/items")


itemRouter.post("/createItem",userMiddleware,upload.single("image"),addItem)
itemRouter.post("/editItem/:itemId",userMiddleware,upload.single("image"),editItem)
itemRouter.get("/getItem/:itemId",userMiddleware, getItem)
itemRouter.get("/deleteItem/:itemId",userMiddleware,deleteItem)
itemRouter.get("/getItemByCity/:city", getItemByCity);

module.exports = itemRouter
