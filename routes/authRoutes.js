const passport = require('passport');

module.exports = (app) => {

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] // all we want is the profile and email address. 
    })  
  );

  // When user gets redirected to auth/google/callback
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {// where the request is sent to after passport.authenticate is finished
      res.redirect('/surveys'); // Another route handler browser will go to after passport.authenticate request is done.
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); //passport attaches logout function to the request
    // this kills the cookie in the browser
    res.send(req.user); //
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //send sends response back
    //passport attaches user to the request
  });
};
