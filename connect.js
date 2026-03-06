const mongoose = require("mongoose");

async function connectToMogoDb() {
  const url = process.env.MONGO_URI;
  if (!url) {
    console.error("MONGO_URI is missing in .env file");
    process.exit(1);
  }
  
  try {
    console.log(`Attempting to connect to MongoDB Atlas with URI: ${url}`);
    await mongoose.connect(url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = {
  connectToMogoDb,
};
