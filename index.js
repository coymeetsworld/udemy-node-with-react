/**
  This app will listen for incoming requests from the Node side,
   and route those requests to different route handlers.
*/
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // Give access to cookies
const passport = require('passport'); // Tell passport to use cookies
const keys = require('./config/keys');
require('./models/User'); // needs to be called before services/passport.js
require('./services/passport'); // passport.js doesn't return anything, so no need to assign the value.

mongoose.connect(keys.mongoURI);

const app = express();

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


require('./routes/authRoutes')(app);
/*
Same as
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

require('./routes/authRoutes') returns a function. 2nd set of parenthesis (app) invokes the function with argument app
*/

const PORT = process.env.PORT || 5000
app.listen(PORT);

