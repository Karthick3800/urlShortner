const express = require("express");
const urlRoute = require("./router/url");
const app = express();
const PORT = 8001;
require('dotenv').config();
const { connectToMogoDb } = require("./connect");

connectToMogoDb();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/url", urlRoute);

// Add route to handle redirecting the short URL to the original URL
const URL = require('./model/url');

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }
  
  // Need to make sure redirectURL has http/https protocol
  let redirectUrl = entry.redirectURL;
  if (!/^https?:\/\//i.test(redirectUrl)) {
    redirectUrl = 'http://' + redirectUrl;
  }
  
  res.redirect(redirectUrl);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
