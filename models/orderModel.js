const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
