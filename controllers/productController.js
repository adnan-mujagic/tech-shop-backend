const Product = require("../models/productModel");
const JWT = require("../utilities/jwt");
const { updateEntity } = require("../utilities/updateEntity");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");

module.exports.createProduct = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["NORMAL", "ADMIN"])) {
    return res.status(403).json({
      message: "This action is not allowed for your role",
    });
  }
  const product = new Product();
  updateEntity(product, req.body);
  await product.save((err, savedProduct) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong while saving product",
      });
    }
    return res.status(200).json({
      message: "Product successfully created",
      data: savedProduct,
    });
  });
};

module.exports.getProduct = async (req, res) => {
  Product.findOne({ _id: req.params.product_id }).exec((err, product) => {
    if (err) {
      return res.status(404).json({
        message: "Product could not be found",
      });
    }
    return res.status(200).json({
      message: "Product found successfully",
      data: product,
    });
  });
};

module.exports.getProducts = async (req, res) => {
  const { page = 1, pageSize = 25 } = req.query;
  Product.find({})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong while fetching products",
        });
      }
      return res.status(200).json({
        message: "Products successfully fetched",
        page,
        pageSize,
        data: products,
      });
    });
};

module.exports.updateProduct = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["NORMAL", "ADMIN"])) {
    return res.status(403).json({
      message: "This action is not allowed for your role",
    });
  }
  Product.findOne({ _id: req.params.product_id }).exec(async (err, product) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong while updating the product",
      });
    }
    updateEntity(product, req.body);
    await product.save((err, savedProduct) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong while updating the product",
        });
      }
      return res.status(200).json({
        message: "Product updated successfully",
        data: savedProduct,
      });
    });
  });
};

module.exports.deleteProduct = async (req, res) => {
  if (!verifyAuthorization(req.headers, ["ADMIN"])) {
    return res.status(403).json({
      message: "This action is not allowed for your role",
    });
  }
  const deletedProduct = await Product.findOneAndDelete({
    _id: req.params.product_id,
  });
  return res.status(200).json({
    message: "Product successfully deleted",
    data: deletedProduct,
  });
};
