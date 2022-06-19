const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");

module.exports.isAdmin = (req, res) => {
  if (!verifyAuthorization(req.headers, ["ADMIN"])) {
    return res.status(200).json({
      admin: false,
    });
  }
  return res.status(200).json({
    admin: true,
  });
};

module.exports.lowestAmountInStock = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  Product.find({})
    .limit(10)
    .sort({ quantity: "asc" })
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong",
        });
      }

      return res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    });
};

module.exports.mostSold = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const pipeline = [
    { $unwind: "$products" },
    {
      $group: {
        _id: {
          product_id: "$products.product_id",
        },
        amount: { $sum: "$products.quantity" },
      },
    },
    {
      $project: {
        amount: 1,
        _id: 0,
        product: "$_id.product_id",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    { $sort: { amount: -1 } },
  ];

  const agg = await Order.aggregate(pipeline);
  let data = [];
  for await (const doc of agg) {
    data.push(doc);
  }
  return res.status(200).json({
    message: "Most sold items fetched successfully",
    data: data,
  });
};
