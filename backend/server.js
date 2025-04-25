const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8081;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON requests

// API route to get weather based on city
app.get("/api/weather/:city", async (req, res) => {
  const { city } = req.params;
  const API_KEY = "cbf34c722696d56dcebabf62ed80830b";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }
    res
      .status(500)
      .json({ message: "Failed to fetch weather data", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather server running on http://localhost:${PORT}`);
});