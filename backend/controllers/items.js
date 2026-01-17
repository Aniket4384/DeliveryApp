const { default: Item } = require("../models/item");
const Shop = require("../models/shop");
const uploadOnCloudinary = require("../utils/cloudinary");

const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ admin: req.userId });
    //   console.log(req.userId)
    //   console.log(shop)
    if (!shop) {
      return res.status(400).json({ message: "shop not found" });
    }

    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });
    shop.items.push(item._id);
    await shop.save();
    await shop.populate("admin");
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } }, // new item jo add hogi vo pahele dekhigi
    });
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ mesage: `add item error ${error}` });
  }
};

const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId);
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      { name, category, foodType, price, image },
      { new: true }
    );
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    const shop = await Shop.findOne({ admin: req.userId }).populate({
      path: "items",
      options: { sort: { updatedAt: -1 } }, // new item jo add hogi vo pahele dekhigi
    });
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ mesage: `edit item error ${error}` });
  }
};

const getItem = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `get item by id error ${error}` });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    const shop = await Shop.findOne({ admin: req.userId });
    shop.items = shop.items.filter((i) => i.toString() !== itemId); // sirf un items ko rakhaga jo id sa match nhi karega
    await shop.save();
    shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } }, // new item jo add hogi vo pahele dekhigi
    });
    return res.status(200).json({ message: "item deleted successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: `delete item error ${error}` });
  }
};

const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: "city is required" });
    }
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");
    if (!shops) {
      return res.status(404).json({ message: "shops not found" });
    }
    const shopId = shops.map((shop)=>shop._id)
      const items = await Item.find({shop:{$in:shopId}}) // vo wali item milagi jiski id shopId ma hogi
      return res.status(200).json(items)
  } catch (error) {
      return res.status(500).json({ message: `get items by city error ${error}` });
  }
};
module.exports = { addItem, editItem, getItem, deleteItem,getItemByCity };
