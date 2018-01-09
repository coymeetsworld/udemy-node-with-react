const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); // Don't need to add file extension of a file we write if     it ends in js

// Not using require for testing environments, like Mocha.
const User = mongoose.model('users'); // one argument means fetch, 2 means insert

// The user object is just what we pulled out of the database in the callback function down below (existingUser or user, whatever is passed into the done function).
passport.serializeUser((user, done) => {
  // user.id is NOT profile.id. user.id is created by mongoDB when we created user:
  /*
  {
    "_id": {  <---- this
        "$oid": "5a51d42f8e3daf73bdb2c314"
    },
    "googleID": "112110373385343411569", <--- not this
    "__v": 0
  }
  */
  // we use use.id just in case we use other authentication methods besides GoogleID (i.e. FB, Twitter, GH, etc)
  // We can use user.id to get the _id.$oid, don't need to type it like the latter.
  done(null, user.id);
});

// user in the callback for serializeUser was a Mongoose Model of a user. We turned the user into an id. Here we're doing the opposite.
passport.deserializeUser((id, done) => {
  //Find the user, and call done with the user.
  User.findById(id).then(user => {
    done(null, user);
  });
});

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

    // Do we already have a user with this profile ID in the DB? If so, skip user creation.
    User.findOne({ googleID: profile.id }) // async operation. Query returns a promise.
      .then((existingUser) => {
        if (existingUser) {
          // Already have a record with the given profile id
          done(null, existingUser);
        } else {
          // creates a modal instance, but doesn't put it in database yet (this is still mongoose). That is what .save() is for.
          new User({ googleID: profile.id }).save() // async operation
            .then(user => done(null, user));
        }
      })
     // Tell passport that we have finished creating a user and that it should now resume the auth process
  })
);
