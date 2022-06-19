const { isAdmin } = require("../controllers/adminController");

let router = require("express").Router();

router.route("/").get(isAdmin);

module.exports = router;
