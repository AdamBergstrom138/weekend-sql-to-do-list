// Importing the express node module:
const express = require('express');
const bodyParser = require('body-parser');

// Import the pool we configured. It lets us connect to our db:
const pool = require('./modules/pool.js');

// Using express to create an instance of an app (or server).
const app = express();

// Create a variable whose value is the port address.
const PORT = 5000;

// Teach our server how to read incoming data (req.body):
app.use(bodyParser.urlencoded({ extended: true }));
// Teach our server how to read incoming JSON data (req.body *from Postman*):
app.use(bodyParser.json())

// Tell our server where the static assets live:
app.use(express.static('server/public'));

// ROUTES
app.use('/', k) //update this to correct DB


// *** Add Code Here ***


// Start the server:
app.listen(PORT, () => {
    console.log(`hey. listen. http://localhost:${PORT}`)
  })