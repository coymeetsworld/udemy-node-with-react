const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

// This is a route-specific middleware
const requireLogin = require('../middlewares/requireLogin'); // putting this middleware here instead of index.js because we only want to use it when related to Stripe API call, not all requests coming into the app.

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

    // reach out to Stripe API and finalize the charge.
    const charge = await stripe.charges.create({
      amount: 500, // still need to specify this for the backend
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    //console.log(charge);

    // req.user automatically setup by passport middleware which was imported in app.use in index.js
    req.user.credits += 5;
    const user = await req.user.save(); //async request

    res.send(user);
  });
};