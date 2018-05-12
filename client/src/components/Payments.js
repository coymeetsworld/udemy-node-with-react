import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';


// token is the callback function that you call after we get an authorization token from the Stripe API. onToken would've made more sense.
class Payments extends Component {

  render() {

    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    )
  }
}

export default Payments;