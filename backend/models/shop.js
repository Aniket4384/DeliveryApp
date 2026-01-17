const mongoose = require("mongoose")
const User = require("./user")

const shopSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },

    image:{
        type: String,
        required: true
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // user ki propeerties ispe hogi
        required: true,
    },

    city:{
        type: String,
        required:true,
    },
    state:{
        type: String,
        required: true
    },

    address:{
        type:String,
        required: true,
    },

    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Item"
    }]


},{timestamps:true})

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop