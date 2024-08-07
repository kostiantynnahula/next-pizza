'use server';

import { stripeClient } from "./client";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const getEventOrderId = async (req: NextRequest): Promise<string> => {
  
  const stripe = stripeClient();
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || '';

  const sigId = headers().get('stripe-signature') || '';
    
  const body = await req.text();

  const event = stripe.webhooks.constructEvent(body, sigId, endpointSecret);

  if (event.type !== 'checkout.session.completed') {
    throw new Error('Invalid event type');
  }

  const data = event.data.object;

  if (!data.metadata) {
    throw new Error('Metadata not found');
  }
  
  return data.metadata.orderId;
};