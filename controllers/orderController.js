const JWT = require("../utilities/jwt");
const OrderFactory = require("../utilities/OrderFactory");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");
const Order = require("../models/orderModel");
const mongoose = require("mongoose");

module.exports.addOrder = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["NORMAL", "ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  let { uid } = JWT.verify(req.headers.authorization);
  let order = OrderFactory.createOrder({ ...req.body, buyer: uid });
  try {
    await order.save();
    res.status(200).json({
      message: "Order saved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while saving your order",
    });
  }
};

module.exports.canReview = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["NORMAL", "ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  let { uid } = JWT.verify(req.headers.authorization);
  const pipeline = [
    { $unwind: "$products" },
    {
      $match: {
        buyer: new mongoose.Types.ObjectId(uid),
        "products.product_id": new mongoose.Types.ObjectId(
          req.params.product_id
        ),
      },
    },
  ];

  const agg = await Order.aggregate(pipeline);
  let data = [];
  for await (const doc of agg) {
    data.push(doc);
  }
  return res.status(200).json({
    canReview: data.length > 0,
  });
};

module.exports.getUserOrders = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["NORMAL", "ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  let { uid } = JWT.verify(req.headers.authorization);
  Order.find({ buyer: uid })
    .populate("products.product_id")
    .exec((err, orders) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
      return res.status(200).json({
        message: "Orders successfully retrieved",
        data: orders,
      });
    });
};
