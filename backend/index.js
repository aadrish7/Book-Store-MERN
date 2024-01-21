import express from "express";
import mongoose from "mongoose";
import { PORT, MONGOURI } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
