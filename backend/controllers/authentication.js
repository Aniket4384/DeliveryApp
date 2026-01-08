const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const { sendOtpMail } = require("../utils/mail"); 
const signup = async(req,res)=>{
    try{
        const{name,email,password,role,mobile} = req.body;
        let user = await User.findOne({email})
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

        return res.status(201).json("sign up successfully");
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

const sendOtp = async(req,res)=>{
    try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "5m" });

    // Send token as a link via email
    const link = `http://localhost:5173/forgot-password?token=${token}`;

    await sendOtpMail(email, { name: user.name, link });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // return payload
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash new password and save
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};



module.exports = {signup,signin,logout,sendOtp,resetPassword}