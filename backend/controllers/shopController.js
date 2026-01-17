const Shop = require("../models/shop");
const uploadOnCloudinary = require("../utils/cloudinary");

const createShop = async(req,res)=>{
    try {
        const{name,city,state,address}= req.body
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path) // return string
        }
        let shop = await Shop.findOne({admin:req.userId})
        if(!shop){
            shop = await Shop.create({
            name,city,state,address,image,admin:req.userId
        })
        }
        else{
             shop = await Shop.findByIdAndUpdate(shop._id,{
            name,city,state,address,image,admin:req.userId
        },{new:true})
        }
        await shop.populate("admin items")
        return res.status(201).json(shop)
    }
     catch (error) {
         return res.status(500).json({message: `create shop error ${error}`})
        
    }
}

const getShop = async(req,res)=>{
    console.log(("route hit"))
    try {
        const shop = await Shop.findOne({admin:req.userId}).populate({
            path: "items",
            options: {sort:{updatedAt:-1}}  // new item jo add hogi vo pahele dekhigi
          })
          await shop.populate("admin")
        if(!shop){
            return null
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json(`error from getShop ${error}`)
    }
}

const getShopByCity = async(req,res)=>{
    try {
        const city = req.params.city
        const shops = await Shop.find({
            city:{$regex: new RegExp(`^${city}$`,"i")}
        }).populate("items")
        if(!shops){
            return res.status(404).json({message:"shops not found"})

        }
        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({message:`get shop by city error ${error}`})
    }

}
module.exports = {createShop,getShop,getShopByCity}