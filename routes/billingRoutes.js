const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {


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