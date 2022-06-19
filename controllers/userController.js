const User = require("../models/userModel");
const { registerValidation, loginValidation } = require("./../validation");
const jwt = require("./../utilities/jwt");
const { updateEntity } = require("../utilities/updateEntity");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");

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
      message: "This email is already in use",
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
      message: errors[0].error,
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

module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.user_id });

  if (!user) {
    res.status(400).json({
      success: false,
      error: "Something went wrong.",
    });
  }

  if (user) {
    res.status(200).json({
      success: true,
      _id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
      email: user.email,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const loggedInUser = jwt.verify(req.headers.authorization);

  if (req.params.user_id !== loggedInUser.uid) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "You didn't make any changes",
    });
  }

  const update = req.body;

  const user = await User.findByIdAndUpdate(loggedInUser.uid, update, {
    new: true,
  });

  if (user) {
    return res.status(200).json({
      message: "Successfuly updated your profile",
    });
  }

  return res.status(400).json({
    message: "Something went wrong",
  });
};
