/**
  This app will listen for incoming requests from the Node side,
   and route those requests to different route handlers.
*/
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // Give access to cookies
const passport = require('passport'); // Tell passport to use cookies
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // needs to be called before services/passport.js
require('./models/Survey');
require('./services/passport'); // passport.js doesn't return anything, so no need to assign the value.

mongoose.connect(keys.mongoURI);

const app = express();

// middlewares below apply to every request that comes into the app.


app.use(bodyParser.json()); // hook up middleware to app.

// cookieSession and passport are middleware, code that modifies requests before sending it through the routes (i.e. get/post/delete/put)

// These 3 app.use middleware functions would intercept any incoming request (but only to a specific route), and modify it

// maxAge: how can cookie exist in browser before it expires (in ms)
// keys: encryption of cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    keys: [keys.cookieKey]
  })
);

// Tell passport that it should make use of cookies to handle authentication (next 2 calls)
app.use(passport.initialize());
app.use(passport.session());

/*
Same as
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

require('./routes/authRoutes') returns a function. 2nd set of parenthesis (app) invokes the function with argument app
*/
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {

  // Express will serve up production assets, like our main.js or main.css file
  app.use(express.static('client/build')); // see if a file that matches our request is in this directory. If so, respond with that

  // If no specific file is found, this "catchall" (index.html) will be the response.
  // Express will server up the index.html file if it doesn't recognize the route.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // just serve up the html document, we assume the react router portion handles this route.
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);

