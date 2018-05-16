const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

module.exports = app => {
  // multiple params, everything will get run until it eventually gets to a function that gets a response object and sends response back to user
  // not calling requireLogin so no parenthesis (i.e. requireLogin()), just saying run this function to verify user is logged in. Nothing else will run if this fails.
  //
  // First make sure the user is logged in.
  //
  // If you're logged in, make sure you have enough credits to create a survey.
  // Were going to make this a middleware because we may use this functionality to check for credits elsewhere
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {




  });
};
