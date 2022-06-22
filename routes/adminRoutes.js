const {
  isAdmin,
  lowestAmountInStock,
  mostSold,
  getFavoriteProducts,
} = require("../controllers/adminController");

let router = require("express").Router();

router.route("/").get(isAdmin);

router.route("/lowInStock").get(lowestAmountInStock);

router.route("/mostSold").get(mostSold);

router.route("/favorites").get(getFavoriteProducts);

module.exports = router;
