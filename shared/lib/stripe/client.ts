import stripe from "stripe";

export const stripeClient = () => {
  return new stripe(process.env.STRIPE_SECRET_KEY || '');
};