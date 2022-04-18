const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  bio: {
    type: String,
    default: "",
  },
  username: String,
  password: String,
  email: String,
  age: Number,
  phone_number: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  profile_picture: {
    type: String,
    default:
      "https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1648896007~hmac=8fec9c21f3c232dd89ccca64cf0dcc51",
  },
  role: {
    type: String,
    default: "NORMAL",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
