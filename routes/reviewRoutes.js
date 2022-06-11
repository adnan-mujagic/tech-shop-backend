const {
  addReview,
  getProductReviews,
} = require("../controllers/reviewController");

let router = require("express").Router();

router.post("/", addReview);
router.get("/:product_id", getProductReviews);

module.exports = router;
