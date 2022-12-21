const urlShortner = require("../models/shortner");
const shortId = require("shortid");
require("dotenv").config();
module.exports.PostLongUrl = async (req, res) => {
  const { longurl, customurl } = req.body;
  const id = shortId.generate();
  let shorturl;
  if (customurl.length === 0) {
    shorturl = `${process.env.HEROKUPORT}/${id}`;
  } else {
    shorturl = `${process.env.HEROKUPORT}/${customurl}`;
  }

  let url = new urlShortner({
    longurl,
    shorturl,
    date: new Date(),
  });
  await url.save((err, succ) => {
    if (err) {
      res.status(401).send({
        message: "SOME THING WENT WRONG TRY AGAIN",
      });
    } else {
      res.status(200).send({
        message: "created successfull",
        shorturl,
      });
    }
  });
};

module.exports.getShortUrl = async (req, res) => {
  await urlShortner
    .findOne({
      shorturl: `${process.env.HEROKUPORT}/${req.params.shorturl}`,
    })
    .exec((err, succ) => {
      if (err) {
        res.status(401).send({
          message: "SOME THING WENT WRONG TRY AGAIN",
        });
      } else {
        if (succ === null) {
          res.status(401).send({
            message: "YOUR URL EXPRIED",
          });
        } else {
          res.redirect(succ.longurl);
        }
      }
    });
};
