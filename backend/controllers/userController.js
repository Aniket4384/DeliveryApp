const User = require("../models/user")
const getUser = async(req,res)=>{
    try{
        const userId = req.userId;
        
        if(!userId){
            return res.status(400).json({message:"userId is not found"})
        }
        const user = await User.findById(userId)
        if(!user){
             return res.status(400).json({message:"user  not found"})
        }

        return res.status(200).json(user)

    }
    catch(err){
         return res.status(400).json({message:`get current user error ${err}`})

    }
}
module.exports = getUser