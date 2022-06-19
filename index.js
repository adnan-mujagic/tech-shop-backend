let express = require("express");
let mongoose = require("mongoose");
let port = process.env.PORT || 3001;
let config = require("./config.js");
let cors = require("cors");
require("dotenv").config();

// Import routes here
let authRoutes = require("./routes/auth");
let productRoutes = require("./routes/prouductRoutes");
let userRoutes = require("./routes/users");
let orderRoutes = require("./routes/orderRoutes");
let reviewRoutes = require("./routes/reviewRoutes");
let adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Here we will add all the routes!
// app.use("/api", userRoute)
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/admin", adminRoutes);

const mongo = mongoose.connect(process.env.DB_PATH, config.DB_OPTIONS);

mongo
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e.message);
  });
