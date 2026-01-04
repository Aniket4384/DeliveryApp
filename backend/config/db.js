const mongoose = require("mongoose")
require("dotenv").config()

async function main(){
    try{
        await mongoose.connect(process.env.KEY)
    }

    catch(err){
        console.log("error in db connection",err.message)
    }
}

module.exports = main