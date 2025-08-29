// server/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/mlb", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sportsbook-api2.p.rapidapi.com/v0/advantages/",
      {
        params: { type: "ARBITRAGE" },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching MLB data:", error.message);
    res.status(500).json({ error: "Failed to fetch MLB data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
