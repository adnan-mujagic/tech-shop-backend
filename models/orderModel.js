const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  total: Number,
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
