const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const signup = async(req,res)=>{
    try{
        const{name,email,password,role,mobile} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).send("user already exist");
        }    
        
        const hashedPass = await bcrypt.hash(password,10);

        user = await User.create({
            name,email,password:hashedPass,role,mobile
        })

        const token = jwt.sign({id:user._id,email},process.env.JWT_SECRET_KEY, {expiresIn:60*60})
        res.cookie("token",token,{
            secure:false,
            maxAge: 60*60*1000
        })

        return res.status(201).json(user);
    }
    catch(err){
        return res.status(500).json(`sign up error ${err}`)

    }
}

const signin = async(req,res)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send("user does not exist ");
        }    
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        const token = jwt.sign({id:user._id,email},process.env.JWT_SECRET_KEY, {expiresIn:60*60})
        res.cookie("token",token,{
            secure:false,
            maxAge: 60*60*1000
        })

        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(`sign in error ${err}`)

    }
}

const logout = async (req,res)=>{
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token)

        await redisClient.set(`token:${token}`, 'blocked')  // since token is valid add to redis
        await redisClient.expireAt(`token:${token}`,payload.exp) // expire the token

        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logout successfully")

    }
    catch(err){
        res.status(503).send("Error : "+err.message)
    }
}
module.exports = {signup,signin,logout}