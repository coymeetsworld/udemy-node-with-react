const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    // reach out to Stripe API and finalize the charge.
    stripe.charges.create({
      amount: 500, // still need to specify this for the backend
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    }); 
  });
};