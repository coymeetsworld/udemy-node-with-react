const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    // reach out to Stripe API and finalize the charge.
    console.log(req.body);
  });
};