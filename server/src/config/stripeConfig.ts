// import Stripe from "stripe";
// import config from "./config";

// const stripe = new Stripe(config.SRIPE_API_SECRET_KEY, {
//   apiVersion: '2023-08-16', 
// });

// export type StripePrice = Stripe.Price;
// export type StripeProduct = Stripe.Product;

// export default stripe;

import stripe from "stripe";
import config from "./config";

const stripeInstance = new stripe(config.STRIPE_API_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

export type StripePrice = stripe.Price; 
export type StripeProduct = stripe.Product; 
export type StripePaymentIntent= stripe.PaymentIntent;
export type StripeCheckoutSession = stripe.Checkout.Session ;


export default stripeInstance; 
