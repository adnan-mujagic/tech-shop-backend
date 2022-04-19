const e = require("express");
const User = require("../models/userModel");

// todo add validation
// const { registerValidation } = require("");

module.exports.register = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    res.status(400).json({
      error: "This email is already in use.",
    });
  }

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, savedUser) => {
    if (err) {
      res.status(400).json({
        status: "Something went wrong",
      });
    } else {
      res.status(200).json({
        data: savedUser,
      });
    }
  });
};
