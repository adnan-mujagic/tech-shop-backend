const e = require("express");
const { entityFactory } = require("../entityFactory");
const User = require("../models/userModel");
const { registerValidation } = require("./../validation");

module.exports.register = async (req, res) => {
  const errors = registerValidation(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({
      error: "This email is already in use.",
    });
  }

  const user = new User();
  entityFactory(user, req.body);

  await user.save((err, savedUser) => {
    if (err) {
      return res.status(400).json({
        status: "Something went wrong",
      });
    } else {
      return res.status(200).json({
        data: savedUser,
      });
    }
  });
};
