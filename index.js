const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const ROBLOX_API_KEY = process.env.ROBLOX_API_KEY;

app.get('/gamepasses/:universeId', async (req, res) => {
  const universeId = req.params.universeId;

  try {
    const response = await axios.get(
      `https://apis.roblox.com/marketplace/v1/games/${universeId}/game-passes`,
      {
        headers: {
          'Authorization': `Bearer ${ROBLOX_API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching gamepasses:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch gamepasses' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

