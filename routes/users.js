const router = require("express").Router();
let userController = require("../controllers/userController");

router.route("/users/:user_id").get(userController.getUser);

module.exports = router;
