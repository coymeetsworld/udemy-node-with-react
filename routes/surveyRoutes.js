const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys'); // Could just import Survey, but this is preferable when we do testing so we don't keep importing Survey schema over and over again.


module.exports = app => {
  // multiple params, everything will get run until it eventually gets to a function that gets a response object and sends response back to user
  // not calling requireLogin so no parenthesis (i.e. requireLogin()), just saying run this function to verify user is logged in. Nothing else will run if this fails.
  //
  // First make sure the user is logged in.
  //
  // If you're logged in, make sure you have enough credits to create a survey.
  // Were going to make this a middleware because we may use this functionality to check for credits elsewhere
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), //wrapping { email } in parenthesis so Js interpreter knows its an object, not a function
      _user: req.user.id, // this is id from mongoose
      dateSent: Date.now()
    });

  });
};
