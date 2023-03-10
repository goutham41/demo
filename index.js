require("dotenv").config();
const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://sugarcosmetics:masaiuint5@cluster0.nfskqzh.mongodb.net/BLOGS?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const express = require("express");
const cors = require("cors");
const urlShortner = require("./routes/shortner")
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://glistening-54g4hg4.netlify.app/",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use("/", urlShortner);
app.use("/start", (req, res) => {
  res.send("working");
});
app.listen(8080, async () => {
  await connection;
  console.log("connected to db");
  console.log(`Server started on 8080`);
});
