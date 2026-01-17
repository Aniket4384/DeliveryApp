// middleware/userMiddleware.js
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const redisClient = require("../config/redis")

const userMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login."
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const { id } = payload;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token structure"
            });
        }

        req.userId = id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Check if token is in blocklist
        const isBlocked = await redisClient.exists(`token:${token}`);
        if (isBlocked) {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again."
            });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error("User middleware error:", err.message);
        
        // Handle specific JWT errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }

        // Generic error
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
}

module.exports = userMiddleware;