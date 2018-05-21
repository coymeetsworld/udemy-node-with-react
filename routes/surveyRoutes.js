const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url'); // default module in the NodeJS system.
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // Could just import Survey, but this is preferable when we do testing so we don't keep importing Survey schema over and over again.


module.exports = app => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {

    const p = new Path('/api/surveys/:surveyId/:choice'); 

    _.chain(req.body) 
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) return { email, surveyId: match.surveyId, choice: match.choice};
      }) 
      .compact() //removes undefined records
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true }
        }).exec(); // exec used to actually execute the query in the mongoDB.
      })
      .value();

    res.send({});
  });

  // multiple params, everything will get run until it eventually gets to a function that gets a response object and sends response back to user
  // not calling requireLogin so no parenthesis (i.e. requireLogin()), just saying run this function to verify user is logged in. Nothing else will run if this fails.
  //
  // First make sure the user is logged in.
  //
  // If you're logged in, make sure you have enough credits to create a survey.
  // Were going to make this a middleware because we may use this functionality to check for credits elsewhere
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), //wrapping { email } in parenthesis so Js interpreter knows its an object, not a function
      _user: req.user.id, // this is id from mongoose
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); // this is an async API request, need this to finish before we commit to database.
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save(); // entry will be stale, need to store result of save in a local constant.

      res.send(user); // user with updated number of credits (subtracted one)
    } catch (err) {
      // 422 unprocessable entity, something wrong w/ the input.
      res.status(422).send(err);
    }
  });
};
