const {
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.route("/").post(createProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
