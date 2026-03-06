const express = require("express");
const router = express.Router();
const { handleGenerateNewShortUrl, getOriginalUrl } = require("../controlers/url");

router.post("/", handleGenerateNewShortUrl);

// Note: This endpoint maps to /url/:shortId
router.get("/:shortId", getOriginalUrl);

module.exports = router;
