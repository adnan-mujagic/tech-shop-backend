const Review = require("../models/reviewModel");
const { updateEntity } = require("./updateEntity");

class ReviewFactory {
  static createReview(body) {
    let review = new Review();
    updateEntity(review, body);
    return review;
  }
}

module.exports = ReviewFactory;
