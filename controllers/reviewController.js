const Review = require("../models/reviewModel");
const JWT = require("../utilities/jwt");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");
const ReviewFactory = require("../utilities/ReviewFactory");

module.exports.addReview = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["NORMAL", "ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  let { uid } = JWT.verify(req.headers.authorization);

  let review = ReviewFactory.createReview({ ...req.body, user: uid });

  try {
    await review.save();
    res.status(200).json({
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went while adding your review",
    });
  }
};

module.exports.getProductReviews = (req, res) => {
  let productId = req.params.product_id;

  Review.find({ product: productId })
    .populate("user")
    .exec((err, reviews) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong with getting the reviews",
        });
      }
      return res.status(200).json({
        message: "Retrieved reviews successfully",
        data: reviews,
      });
    });
};
