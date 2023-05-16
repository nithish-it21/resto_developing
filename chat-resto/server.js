const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/restaurant', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Define routes
app.post('/login', (req, res) => {
  // Handle login request (you can modify this part to suit your needs)
  const { email, password } = req.body;

  // Perform login logic (e.g., check credentials in the database)

  // Return response indicating success or failure
  res.json({ success: true }); // Modify this based on your authentication logic
});

app.post('/signup', (req, res) => {
  // Handle signup request (you can modify this part to suit your needs)
  const { name, email, password } = req.body;

  // Perform signup logic (e.g., create a new user in the database)

  // Return response indicating success or failure
  res.json({ success: true }); // Modify this based on your signup logic
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
