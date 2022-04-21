const User = require("../models/userModel");
const { registerValidation, loginValidation } = require("./../validation");
const jwt = require("./../utilities/jwt");
const { updateEntity } = require("../utilities/updateEntity");

module.exports.register = async (req, res) => {
  const errors = registerValidation(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(". "),
    });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({
      message: "This email is already in use.",
    });
  }

  const user = new User();
  updateEntity(user, req.body);

  await user.save((err, savedUser) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    } else {
      return res.status(200).json({
        message: "User registered successfully",
        token: jwt.sign(savedUser),
      });
    }
  });
};

module.exports.login = async (req, res) => {
  const errors = loginValidation(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(". "),
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      message: "The user with this email address does not exist",
    });
  }

  if (user.password !== req.body.password) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  }

  let token = jwt.sign(user);

  return res.status(200).json({
    message: "User logged in successfully",
    token,
  });
};
