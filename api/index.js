import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import surahRouter from "./routes/surahRouter.js";
import tafserRouter from "./routes/tafserRouter.js";
import pageRouter from "./routes/pageRouter.js";
import userRouter from "./routes/userRouter.js";
import collectionRouter from "./routes/collectionRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const url = process.env.MONGO;

app.listen(port, (err) => {
  console.log("server is running on port " + port);
  console.log("http://localhost:" + port);
});

mongoose.connect(url).then(() => {
  console.log(url);
});

app.use("/api/quran", surahRouter);
app.use("/api/quran", pageRouter);
app.use("/api/quran", tafserRouter);
app.use("/api/quran", userRouter);
app.use("/api/quran", collectionRouter);
