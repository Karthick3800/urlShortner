# Custom URL Shortener

A custom URL shortener API built with Node.js, Express, and MongoDB.

## Features

- Shorten any valid URL
- Automatically generates a unique string ID using `nanoid`
- Redirects short URLs to the original destination
- Tracks visit history and timestamps for each access

## Prerequisites

- Node.js installed on your machine
- MongoDB instance (running locally or via MongoDB Atlas)

## Installation

1. Navigate to the project directory:
   ```bash
   cd urlShortner
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables (like MongoDB connection string):
   ```env
   # Example .env file
   # Add any variables your connect.js requires, e.g.,
   MONGODB_URI=mongodb://127.0.0.1:27017/short-url
   ```

## Running the Application

To start the server, run:
```bash
node index.js
```
The server runs on port `8001` by default.

## API Endpoints

### 1. Create a Short URL
- **URL:** `/url`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "url": "https://www.example.com"
  }
  ```
- **Description:** Generates a new short ID for the provided URL and saves it to the database.

### 2. Access Short URL (Redirect)
- **URL:** `/:shortId`
- **Method:** `GET`
- **Description:** Finds the original URL by its `shortId`, logs the visit timestamp, and redirects the client to the original URL. Automatically handles missing `http://` protocols.

### 3. Get URL Analytics (Likely available)
- **URL:** `/url/:shortId`
- **Method:** `GET`
- **Description:** Retrieves analytics (like total views and visit history) for a specific short ID.

## Core Dependencies

- `express` (^5.2.1)
- `mongoose` (^8.23.0)
- `nanoid` (^3.3.11)
- `dotenv` (^17.3.1)
