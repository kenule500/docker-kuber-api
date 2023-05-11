import express from "express";
import os from "os";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  PORT,
} from "./config/config.js";

const app = express();

// const mongoURL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?directConnection=true&authSource=admin`;
const mongoURL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@kenule0.qcnhc.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

const mongoUsername = Buffer.from(MONGODB_USER, "base64").toString("ascii");

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => {
      console.log(`Error connecting to database: ${err}`);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
app.use(express.json());

app.get("/", (req, res) => {
  const hello = `Version 3:Heloo from the ${os.hostname()} ${MONGODB_USER}  ${MONGODB_PASSWORD} ${MONGODB_PORT} ${MONGODB_HOST}  ${MONGODB_USER}`;
  console.log("decoded", mongoUsername);
  console.log(
    "HELO0",
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE
  );
  res.send(hello);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
