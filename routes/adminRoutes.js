const {
  isAdmin,
  lowestAmountInStock,
  mostSold,
} = require("../controllers/adminController");

let router = require("express").Router();

router.route("/").get(isAdmin);

router.route("/lowInStock").get(lowestAmountInStock);

router.route("/mostSold").get(mostSold);

module.exports = router;
