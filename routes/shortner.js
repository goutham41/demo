const router = require("express").Router();
const { PostLongUrl, getShortUrl } = require("../controllers/shortner");
router.post("/url", PostLongUrl);
router.get("/:shorturl",getShortUrl);
module.exports = router;
