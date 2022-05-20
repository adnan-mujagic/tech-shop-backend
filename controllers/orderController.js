const JWT = require("../utilities/jwt");
const OrderFactory = require("../utilities/OrderFactory");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");
let { ObjectId } = require("mongodb");
const Order = require("../models/orderModel");

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
        buyer: new ObjectId(uid),
        "products.product_id": new ObjectId(req.params.product_id),
      },
    },
    {
      $group: {
        _id: {
          buyer: "$buyer",
          product: "$products.product_id",
        },
        count: { $sum: "$products.quantity" },
      },
    },
  ];

  const agg = Order.find(pipeline);
  let data = [];
  for await (const doc of agg) {
    data.push(doc);
  }
  if (data.length === 0) {
    return res.status(200).json({
      canReview: false,
    });
  }
  console.log(data[0]);
  return res.status(200).json({
    canReview: data[0].count > 0,
  });
};
