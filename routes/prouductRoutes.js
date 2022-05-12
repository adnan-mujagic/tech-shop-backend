const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
} = require("../controllers/productController");

const router = require("express").Router();

router.route("/").get(getProducts).post(createProduct);

router
  .route("/:product_id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
