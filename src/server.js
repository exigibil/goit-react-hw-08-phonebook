const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const AUTH0_DOMAIN = 'your-auth0-domain';
const AUTH0_CLIENT_ID = 'your-client-id';
const AUTH0_CLIENT_SECRET = 'your-client-secret';
const AUTH0_API_BASE_URL = `https://${AUTH0_DOMAIN}/api/v2`;

const getToken = async () => {
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_API_BASE_URL,
    grant_type: 'client_credentials'
  });
  return response.data.access_token;
};

app.post('/register', async (req, res) => {
  try {
    const accessToken = await getToken();
    const response = await axios.post(
      `${AUTH0_API_BASE_URL}/users`,
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: error.message });
  }
});

// Other routes for login, logout, etc.

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
