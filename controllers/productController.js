const Product = require("../models/productModel");
const JWT = require("../utilities/jwt");
const { updateEntity } = require("../utilities/updateEntity");
const { verifyAuthorization } = require("../utilities/verifyAuthorization");

module.exports.createProduct = async (req, res) => {
  if (!verifyAuthorization(req.headers, "ADMIN")) {
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

module.exports.updateProduct = async (req, res) => {
  if (!verifyAuthorization(req.headers, "ADMIN")) {
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
  if (!verifyAuthorization(req.headers, "ADMIN")) {
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
