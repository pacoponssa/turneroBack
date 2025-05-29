const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Gym Turnero Backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Package.json scripts
// "scripts": {
//   "start": "node server.js",
//   "dev": "nodemon server.js"
// }
