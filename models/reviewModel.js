const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: Number,
  text: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
