const mongoose = require("mongoose");

const urlShortnerSchema = new mongoose.Schema({
  longurl: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "10m" },
  },
});
const urlShortner = mongoose.model("urlshortner", urlShortnerSchema);
module.exports = urlShortner;
