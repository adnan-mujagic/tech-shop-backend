const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
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

module.exports.getFavoriteProducts = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["ADMIN"])) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const pipeline = [
    {
      $group: {
        _id: "$product",
        average_rating: {
          $avg: "$rating",
        },
      },
    },
    {
      $sort: {
        average_rating: -1,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        product: 1,
        _id: 0,
        average_rating: 1,
      },
    },
  ];

  const data = await Review.aggregate(pipeline);

  if (data) {
    return res.status(200).json({
      message: "Best rated products fetched successfully",
      data,
    });
  } else {
    return res.status(400).json({
      message: "Something went wrong when fetching best rated products",
    });
  }
};
