/**
  This app will listen for incoming requests from the Node side,
   and route those requests to different route handlers.
*/


// CommonJS modules. Currently, NodeJS only has support for CommonJS modules.
// CommonJS used to share code between several files.
const express = require('express');

//This format below uses ES2015 module system. NodeJS does not have support for this module system.
//import express from 'express';


// generates a running express app. Can run express() multiple times, this project will just use it once. Most projects will.
const app = express();

/**
Route Handler

app - Express App to register this route handler with
get - Watch for incoming HTTP requests with this method (GET)
/   - Specific route to watch for requests (i.e. '/')
req - JSON object representing the incoming request
res - JSON object representing the outgoing response

Whenever a GET request is received by the express app for the route /, it will automatically call the function in the 2nd argument.

*/
app.get('/', (req, res) => {
  res.send({ hi: 'there' }); // closes request, and send response (JSON object)
});

// For Heroku, dynamically created port that is assigned for our app.
const PORT = process.env.PORT || 5000 // 5000 hard coded for development environments, prod will be whatever port Heroku provides us.

// Express just telling NodeJS, watch for traffic on port PORT.
// The express app is not listening on this port directly. That's handled by NodeJS which passes off request to express.
app.listen(PORT);


