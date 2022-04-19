const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "API is working",
    version: "1.0.0",
  });
});

module.exports = router;
