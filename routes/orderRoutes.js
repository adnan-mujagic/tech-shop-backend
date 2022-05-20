const { addOrder, canReview } = require("../controllers/orderController");

let router = require("express").Router();

router.post("/", addOrder);

router.get("/canReview/:product_id", canReview);

module.exports = router;
