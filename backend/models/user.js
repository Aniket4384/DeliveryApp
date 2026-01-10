const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String, //not required true beacuse implementing google authentication
    },

    role: {
      type: String,
      enum: ["customer", "admin", "rider"],
      // required: true,
      default: "customer",
    },
    mobile: {
      type: String,
      required: false,
      minlength: 10,
      maxlength: 10,
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
