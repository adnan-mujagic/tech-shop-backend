import express, { urlencoded, json } from "express";
import mongoose from "mongoose";
let port = process.env.PORT || 3000;
import config from "./config.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.listen(port, () => {
  console.log(process.env.DB_PATH);
  console.log("Listening on port " + port);
});

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());

// Here we will add all the routes!
// app.use("/api", userRoute)

const mongo = mongoose.connect(process.env.DB_PATH, config.DB_OPTIONS);

mongo
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e.message);
  });
