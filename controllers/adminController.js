const { verifyAuthorization } = require("../utilities/verifyAuthorization");

module.exports.isAdmin = (req, res) => {
  if (!verifyAuthorization(req.headers, ["ADMIN"])) {
    return res.status(200).json({
      admin: false,
    });
  }
  return res.status(200).json({
    admin: true,
  });
};
