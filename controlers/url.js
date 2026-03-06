const { nanoid } = require("nanoid");
const URL = require('../model/url');

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = nanoid(8);
  
  try {
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
    
    // Construct the full short URL
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortID}`;
    
    return res.json({ id: shortID, shortUrl: shortUrl });
  } catch (error) {
    console.error("Error creating document: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOriginalUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = { handleGenerateNewShortUrl, getOriginalUrl };