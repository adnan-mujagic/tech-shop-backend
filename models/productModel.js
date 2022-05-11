const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  images: [
    {
      type: String,
    },
  ],
  price: Number,
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  quantity: Number,
  date_added: {
    type: Date,
    default: Date.now,
  },
  last_restocked: {
    type: Date,
    default: Date.now,
  },
  properties: {
    type: Object,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
