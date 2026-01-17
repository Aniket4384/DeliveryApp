const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
  console.log("Uploading:", filePath);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "shops"
    });

    fs.unlinkSync(filePath);
    return result.secure_url;

  } catch (error) {
    console.log("Cloudinary Error:", error);
    fs.unlinkSync(filePath);
    return null;
  }
};

module.exports = uploadOnCloudinary;
