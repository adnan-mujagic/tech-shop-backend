const {
  addOrder,
  canReview,
  getUserOrders,
} = require("../controllers/orderController");

let router = require("express").Router();

router.post("/", addOrder);

router.get("/canReview/:product_id", canReview);

router.get("/", getUserOrders);

module.exports = router;
