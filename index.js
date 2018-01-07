/**
  This app will listen for incoming requests from the Node side,
   and route those requests to different route handlers.
*/
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys'); // Don't need to add file extension of a file we write if it ends in js

const app = express();

// I want to authenticate my users
passport.use(
  // with Google, passport implicity refers to this GoogleStrategy as 'google'. This is used in the passport.authenticate method below.
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,

    //route the user will be sent to after they grant permission to our app
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // When user comes back after authenticating with Google, this is called.
    console.log('access token: ', accessToken);
    console.log('refresh token: ', refreshToken);
    console.log('profile: ', profile);
  })
);

//Route handler, tell express to involve passport where user will be put into the auth flow.
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // all we want is the profile and email address. 
  })
);

/*
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code& JUST WANT A CODE BACK
redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback& PATH TO REDIRECT USER AFTER THEY GRANT PERMISSION TO APP. Need to verify this in Google API
scope=profile%20email&
client_id=897736878687-t04mtq35bnq803b3ncpd3goc7jt2rtu0.apps.googleusercontent.com' 
*/

// When user gets redirected to auth/google/callback
app.get(
 '/auth/google/callback', 
 passport.authenticate('google')
//passport will see the code inside the URL. Shows the user is not trying to authenticate again, they're trying to get information to create a profile. The Google Strategy will not put them in the OAuth flow, it will handle the request differently to get the user profile.
);

const PORT = process.env.PORT || 5000
app.listen(PORT);

